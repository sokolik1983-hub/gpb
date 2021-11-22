import type { FC } from 'react';
import React from 'react';
import type { IGroupedAccounts } from 'interfaces/client';
import { locale } from 'localization';
import type { Row } from 'react-table';
import { Typography, Box } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ToggleRowsVisibilityButton. */
export interface IToggleRowsVisibilityButtonProps {
  /** Блок со сгруппированными счетами. */
  groupingRow: Row<IGroupedAccounts>;
}

/** Кнопка, по нажатию на которую скрываются и показываются счета. */
export const ToggleRowsVisibilityButton: FC<IToggleRowsVisibilityButtonProps> = ({ groupingRow }) => (
  <Box className={css.toggleButton}>
    <Typography.Text clickable inline fill={'ACCENT'} onClick={() => groupingRow.toggleRowExpanded()}>
      {groupingRow.isExpanded
        ? locale.turnoverScroller.buttons.collapseRows
        : locale.turnoverScroller.buttons.expandRows({ rowsAmount: groupingRow.subRows?.length ?? '' })}
    </Typography.Text>
  </Box>
);

ToggleRowsVisibilityButton.displayName = 'ToggleRowsVisibilityButton';
