import React from 'react';
import type { IOption, IListNavigatedProps } from '@platform/ui';
import { Box, LayoutScroll, RADIUS, RADIUS_APPLY, Option } from '@platform/ui';
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
    <LayoutScroll autoHeight autoHeightMax={150} onScroll={onScroll}>
      {options.map(option => (
        <Box key={option.value} clickable onMouseDown={() => onSelectOption(option)}>
          <OptionTemplate extraSmall option={option} />
        </Box>
      ))}
    </LayoutScroll>
  </Box>
);

OptionsList.displayName = 'OptionsList';
