import type { FC } from 'react';
import React from 'react';
import { locale } from 'localization';
import { Typography, Box, ROLE } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ToggleRowsVisibilityButton. */
export interface IToggleRowsVisibilityButtonProps {
  /**
   * Обработчик нажатия на кнопку.
   */
  onClick(): void;
  /**
   * Максимальное кол-во видимых счетов.
   */
  maxVisibleSize: number;
  /**
   * Общее кол-во элементов.
   */
  totalSize: number;
}

/** Кнопка, по нажатию на которую скрываются и показываются счета. */
export const ToggleRowsVisibilityButton: FC<IToggleRowsVisibilityButtonProps> = ({ onClick, maxVisibleSize, totalSize }) => (
  <Box className={css.toggleButton}>
    <Typography.Text clickable inline data-action={'switch-expanded'} fill={'ACCENT'} role={ROLE.CHECKBOX} onClick={onClick}>
      {maxVisibleSize > 3
        ? locale.turnoverScroller.buttons.collapseRows
        : locale.turnoverScroller.buttons.expandRows({ rowsAmount: totalSize })}
    </Typography.Text>
  </Box>
);

ToggleRowsVisibilityButton.displayName = 'ToggleRowsVisibilityButton';
