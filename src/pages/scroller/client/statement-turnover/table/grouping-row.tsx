import type { FC } from 'react';
import React from 'react';
import cn from 'classnames';
import type { IGroupedAccounts, IGroupInfo } from 'interfaces/dto';
import { GROUPING_TYPE } from 'interfaces/dto';
import type { Row } from 'react-table';
import { Box, Typography, WithInfoTooltip, ROLE, ServiceIcons, Gap, Horizon } from '@platform/ui';
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
  const { original, getRowProps, cells, isExpanded } = groupingRow;

  const { groupInfo } = original;

  const { groupingType } = groupInfo;

  const { key, ...rowProps } = getRowProps();

  const Icon = isExpanded ? ServiceIcons.ChevronDown : ServiceIcons.ChevronUp;

  // Группирующая строка, для значения группировки "по валютам",
  // отображается в таблице, так же как строки с данными по счётам.
  if (groupingType === GROUPING_TYPE.CURRENCIES) {
    return (
      <Box {...rowProps} className={css.borderedRow} fill="FAINT">
        {cells.map(cell => {
          const { key: cellKey, ...cellProps } = cell.getCellProps({ role: ROLE.GRIDCELL });

          return (
            <Box key={cellKey} {...cellProps} className={css.cell}>
              {cell.render('Cell')}
            </Box>
          );
        })}
      </Box>
    );
  }

  const groupingTitle = getGroupingTitle(groupInfo);

  // Группирующие строки рендерятся без колонок, чтобы избежать переноса строки в колонке.
  return (
    <Box {...rowProps} className={cn(css.groupingRow, { [css.borderedRow]: !isExpanded })}>
      <Horizon>
        <Icon fill="FAINT" scale={'MD'} />
        <Gap.SM />
        <WithInfoTooltip text={groupingTitle}>
          {tooltipRef => (
            <Typography.PBold className="H3" innerRef={tooltipRef} line={'COLLAPSE'}>
              {groupingTitle}
            </Typography.PBold>
          )}
        </WithInfoTooltip>
      </Horizon>
    </Box>
  );
};

GroupingRow.displayName = 'GroupingRow';
