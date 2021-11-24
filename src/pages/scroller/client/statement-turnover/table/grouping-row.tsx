import type { FC } from 'react';
import React from 'react';
import type { IGroupedAccounts, IGroupInfo } from 'interfaces/client';
import { GROUPING_TYPE } from 'interfaces/client';
import type { Row } from 'react-table';
import { Box, Typography } from '@platform/ui';
import css from './styles.scss';

/**
 * Возвращает значение для группирующей строки.
 *
 * @param groupInfo - Группирующая строка.
 */
export const getGroupingTitle = (groupInfo: IGroupInfo): string => {
  const { groupingType = '', organizationName = '', branchName = '', accountType = '' } = groupInfo;

  switch (groupingType) {
    case GROUPING_TYPE.ORGANIZATIONS:
      return organizationName;
    case GROUPING_TYPE.BRANCHES:
      return branchName;
    case GROUPING_TYPE.ACCOUNT_TYPE:
      return accountType;
    default:
      return '';
  }
};

/** Свойства компонента GroupingRow. */
export interface IGroupingRowProps {
  /** Блок со сгруппированными счетами. */
  groupingRow: Row<IGroupedAccounts>;
}

/** Группирующая строка таблицы Оборотов. */
export const GroupingRow: FC<IGroupingRowProps> = ({ groupingRow }) => {
  const { groupInfo } = groupingRow.original;

  const { groupingType } = groupInfo;

  const { key, ...rowProps } = groupingRow.getRowProps();

  // Группирующая строка, для значения группировки "по валютам",
  // отображается в таблице, так же как строки с данными по счётам.
  if (groupingType === GROUPING_TYPE.CURRENCIES) {
    return (
      <Box {...rowProps} className={css.borderedRow}>
        {groupingRow.cells.map(cell => {
          const { key: cellKey, ...cellProps } = cell.getCellProps();

          return (
            <Box key={cellKey} {...cellProps} className={css.cell}>
              {cell.render('Cell')}
            </Box>
          );
        })}
      </Box>
    );
  }

  // Группирующие строки рендерятся без колонок, чтобы избежать переноса строки в колонке.
  return (
    <Box {...rowProps} className={css.groupingRow}>
      <Typography.H3 className="H3">{getGroupingTitle(groupInfo)}</Typography.H3>
    </Box>
  );
};

GroupingRow.displayName = 'GroupingRow';
