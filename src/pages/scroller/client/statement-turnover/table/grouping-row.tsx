import type { FC } from 'react';
import React from 'react';
import cn from 'classnames';
import type { IGroupedAccounts, IGroupInfo } from 'interfaces/dto';
import { GROUPING_TYPE } from 'interfaces/dto';
import type { Row } from 'react-table';
import { Box, Typography, WithInfoTooltip, ROLE, ServiceIcons, Gap, Horizon, WithClickable } from '@platform/ui';
import css from './styles.scss';

/** Список уровней группирующей строки. */
export enum GROUPING_ROW_LEVEL {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
}

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

/**
 * Возвращает css-класс группирующей строки.
 *
 * @param level - Уровень группирующей строки.
 */
const getClassNameByLevel = (level: GROUPING_ROW_LEVEL) => {
  switch (level) {
    case GROUPING_ROW_LEVEL.FIRST:
      return css.groupingRowFirstLevel;
    case GROUPING_ROW_LEVEL.SECOND:
      return css.groupingRowSecondLevel;
    default:
      return '';
  }
};

/** Свойства компонента GroupingRow. */
export interface IGroupingRowProps {
  /** Блок со сгруппированными счетами. */
  groupingRow: Row<IGroupedAccounts>;
  /** Признак `цветового эффекта` группирующей строки. */
  highlight?: boolean;
  /** Признак важности группирующей строки. */
  primary?: boolean;
  /** Уровень вложенности группирующей строки. */
  level: GROUPING_ROW_LEVEL;
}

/** Группирующая строка таблицы Оборотов. */
export const GroupingRow: FC<IGroupingRowProps> = ({ groupingRow, highlight, level, primary }) => {
  const { original, getRowProps, cells, isExpanded } = groupingRow;

  const { groupInfo } = original;

  const { groupingType } = groupInfo;

  const { key, ...rowProps } = getRowProps();

  const Icon = isExpanded ? ServiceIcons.ChevronDown : ServiceIcons.ChevronUp;

  const classNameByLevel = getClassNameByLevel(level);

  // Группирующая строка, для значения группировки "по валютам",
  // отображается в таблице, так же как строки с данными по счётам.
  if (groupingType === GROUPING_TYPE.CURRENCIES) {
    return (
      <WithClickable>
        {(ref, { hovered }) => (
          <Box
            {...rowProps}
            ref={ref}
            className={cn(css.groupingRow, classNameByLevel, css.groupingRowWithCells, {
              [css.borderedRow]: !isExpanded,
              [css.highlight]: highlight,
              [css.hoveredRow]: hovered,
            })}
          >
            {cells.map(cell => {
              const { key: cellKey, ...cellProps } = cell.getCellProps({ role: ROLE.GRIDCELL });

              return (
                <Box key={cellKey} {...cellProps} className={css.cell}>
                  {cell.render('Cell')}
                </Box>
              );
            })}
          </Box>
        )}
      </WithClickable>
    );
  }

  const groupingTitle = getGroupingTitle(groupInfo);

  // Группирующие строки рендерятся без колонок, чтобы избежать переноса строки в колонке.
  return (
    <WithClickable>
      {(ref, { hovered }) => (
        <Box
          {...rowProps}
          ref={ref}
          className={cn(css.groupingRow, classNameByLevel, {
            [css.borderedRow]: !isExpanded,
            [css.groupingRowPrimary]: primary,
            [css.highlight]: highlight,
            [css.hoveredRow]: hovered,
          })}
        >
          <Horizon>
            <Icon fill="FAINT" scale={'MD'} />
            <Gap.SM />
            <WithInfoTooltip text={groupingTitle}>
              {tooltipRef =>
                primary ? (
                  <Typography.PBold className="H3" innerRef={tooltipRef} line={'COLLAPSE'}>
                    {groupingTitle}
                  </Typography.PBold>
                ) : (
                  <Typography.P>{groupingTitle}</Typography.P>
                )
              }
            </WithInfoTooltip>
          </Horizon>
        </Box>
      )}
    </WithClickable>
  );
};

GroupingRow.displayName = 'GroupingRow';
