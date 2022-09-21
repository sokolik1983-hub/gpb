import React from 'react';
import { locale } from 'localization';
import type { IOption, IListNavigatedProps } from '@platform/ui';
import { Box, LayoutScroll, RADIUS, RADIUS_APPLY, Option, Typography, Adjust } from '@platform/ui';
import css from './style.scss';

/** Свойства для списка элементов. */
export interface IOptionList extends Pick<IListNavigatedProps, 'onSelectOption'> {
  /** Опции. */
  options: IOption[];
  /** Колбэк для scroll. */
  onScroll?(e: React.SyntheticEvent): void;
  /** Шаблон для опции. */
  optionTemplate?: React.FC<{ option: IOption }>;
}

/** Компонент списка опций. */
export const OptionsList: React.FC<IOptionList> = ({
  options,
  onSelectOption = () => {},
  onScroll,
  optionTemplate: OptionTemplate = Option,
}) => (
  <Box className={css.halfOption} radius={[RADIUS.LG, RADIUS_APPLY.BOTTOM]}>
    <Adjust pad={['XS', 'SM']}>
      <Typography.TextBold>{locale.transactionsScroller.labels.recentRequests}</Typography.TextBold>
    </Adjust>
    <LayoutScroll autoHeight autoHeightMax={200} onScroll={onScroll}>
      {options.map(option => (
        <Box key={option.value} clickable onMouseDown={() => onSelectOption(option)}>
          <OptionTemplate extraSmall option={option} />
        </Box>
      ))}
    </LayoutScroll>
  </Box>
);

OptionsList.displayName = 'OptionsList';
