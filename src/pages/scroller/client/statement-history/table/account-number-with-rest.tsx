import type { FC } from 'react';
import React from 'react';
import { PopUp } from 'components';
import { locale } from 'localization';
import { Typography, LayoutScrollComponent, Box, Horizon, WithInfoTooltip } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ItemWitAmount. */
interface IItemWitAmountProps {
  /** Номер счёта или организация. */
  item: string;
  /** Количество счетов или организаций не отображаемых в строке скроллера. */
  additionalAmount: number;
  /** Если true - то для рендера используется Typography.SmallText иначе Typography.Text. */
  small?: boolean;
}

/** Номер счёта или наименование организации, с количеством неотображаемых элементов. */
const ItemWitAmount = React.forwardRef<typeof Typography, IItemWitAmountProps>(({ item, additionalAmount, small = false }, ref) => {
  const TypographyElement = small ? Typography.SmallText : Typography.Text;

  return (
    <Horizon>
      <WithInfoTooltip text={item}>
        {tooltipRef => (
          <TypographyElement innerRef={tooltipRef} line={'COLLAPSE'}>
            {item}
          </TypographyElement>
        )}
      </WithInfoTooltip>
      {additionalAmount !== 0 && (
        <>
          {', '}
          <TypographyElement inline fill={'ACCENT'} innerRef={ref}>
            {locale.historyScroller.table.prefixedByPlus({ value: additionalAmount })}
          </TypographyElement>
        </>
      )}
    </Horizon>
  );
});

ItemWitAmount.displayName = 'ItemWitAmount';

/** Свойства компонента AccountNumbers. */
interface IAdditionalItemsProps {
  /** Элементы для отображения. */
  items: string[];
}

/** Дополнительные элементы (номера счетов или организации) отображаемые во всплывающем окне. */
const AdditionalItems: FC<IAdditionalItemsProps> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <Box className={css.accountsPopUp} fill={'BASE'} radius={'XS'} shadow={'LG'}>
      <LayoutScrollComponent autoHeight autoHeightMax={120} autoHide={false}>
        {items.map(item => (
          <WithInfoTooltip key={item} text={item}>
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

/** Свойства компонента AccountNumber. */
export interface IAccountNumberProps {
  /** Элементы для отображения. */
  items: string[];
  /** Если true - то для рендера используется Typography.SmallText иначе Typography.Text. */
  small?: boolean;
}

/**
 * Номер счёта или наименование организации,
 * с количеством дополнительных элементов, отображаемых во всплывающем окне,
 * По наведению на количество дополнительных элементов открывается всплывающее окно.
 */
export const AccountNumberWithRest: FC<IAccountNumberProps> = ({ items, small }) => {
  const [firstItem, ...restItems] = items;

  return (
    <PopUp>
      {ref => <ItemWitAmount ref={ref} additionalAmount={restItems.length} item={firstItem} small={small} />}
      <AdditionalItems items={restItems} />
    </PopUp>
  );
};

AccountNumberWithRest.displayName = 'AccountNumberWithRest';
