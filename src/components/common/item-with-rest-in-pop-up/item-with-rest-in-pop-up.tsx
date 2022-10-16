import type { FC } from 'react';
import React from 'react';
import { locale } from 'localization';
import { Typography, LayoutScrollComponent, Box, Horizon, WithInfoTooltip } from '@platform/ui';
import { PopUp } from '../pop-up';
import css from './styles.scss';

/** Свойства компонента ItemWitAmount. */
interface IItemWitAmountProps {
  /** Элемент для отображения. */
  item: React.ReactElement | string;
  /** Количество счетов или организаций не отображаемых в строке скроллера. */
  additionalAmount: number;
  /** Компонент, которым будет рендерится элемент. */
  component: typeof Typography[keyof typeof Typography];
}

/** Наименование, с количеством неотображаемых элементов. */
const ItemWitAmount = React.forwardRef<typeof Typography, IItemWitAmountProps>(({ item, additionalAmount, component: Component }, ref) => (
  <Horizon>
    <WithInfoTooltip extraSmall text={item}>
      {tooltipRef => (
        <Component innerRef={tooltipRef} line={'COLLAPSE'}>
          {item}
        </Component>
      )}
    </WithInfoTooltip>
    {additionalAmount !== 0 && (
      <>
        {', '}
        <Component inline fill={'ACCENT'} innerRef={ref}>
          {locale.historyScroller.table.prefixedByPlus({ value: additionalAmount })}
        </Component>
      </>
    )}
  </Horizon>
));

ItemWitAmount.displayName = 'ItemWitAmount';

/** Свойства компонента AdditionalItems. */
interface IAdditionalItemsProps {
  /** Элементы для отображения. */
  items: React.ReactElement[] | string[];
}

/** Дополнительные элементы отображаемые во всплывающем окне. */
const AdditionalItems: FC<IAdditionalItemsProps> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <Box className={css.accountsPopUp} fill={'BASE'} radius={'XS'} shadow={'LG'}>
      <LayoutScrollComponent autoHeight autoHeightMax={120} autoHide={false}>
        {items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <WithInfoTooltip key={index} text={item}>
            {tooltipRef => (
              <Typography.Text innerRef={tooltipRef} line={'COLLAPSE'}>
                {item}
              </Typography.Text>
            )}
          </WithInfoTooltip>
        ))}
      </LayoutScrollComponent>
    </Box>
  );
};

AdditionalItems.displayName = 'AdditionalItems';

/** Свойства компонента ItemWithRestInPopUp. */
export interface IItemWithRestInPopUpProps {
  /** Элементы для отображения. */
  items: React.ReactElement[] | string[];
  /** Если true - то для рендера используется Typography.SmallText иначе Typography.Text. */
  small?: boolean;
  /** Компонент, которым будет рендерится элемент. */
  component: typeof Typography[keyof typeof Typography];
}

/**
 * Отображает элемент (текст),
 * с количеством дополнительных элементов, отображаемых во всплывающем окне,
 * По наведению на количество дополнительных элементов открывается всплывающее окно.
 */
export const ItemWithRestInPopUp: FC<IItemWithRestInPopUpProps> = ({ items, component }) => {
  const [firstItem, ...restItems] = items;

  return (
    <PopUp>
      {ref => <ItemWitAmount ref={ref} additionalAmount={restItems.length} component={component} item={firstItem} />}
      <AdditionalItems items={restItems as IItemWithRestInPopUpProps['items']} />
    </PopUp>
  );
};

ItemWithRestInPopUp.displayName = 'ItemWithRestInPopUp';
