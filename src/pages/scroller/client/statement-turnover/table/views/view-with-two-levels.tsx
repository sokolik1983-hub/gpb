import React from 'react';
import { AccordionGroup, AccordionItem, StickyRow } from 'components';
import {
  COMMON_SCROLLER_NODE,
  TURNOVERS_SCROLLER_ROW_CATEGORY_NODE,
  TURNOVERS_SCROLLER_ROW_SUBCATEGORY_NODE,
} from 'stream-constants/a11y-nodes';
import { AccountList } from '../account-list';
import { GROUPING_ROW_LEVEL, GroupingRow } from '../grouping-row';
import type { IScrollerView } from '../table-body';

/**
 * Компонент просмотра таблицы с двумя уровнями вложенности счетов.
 */
export const ViewWithTwoLevels: React.FC<IScrollerView> = ({ rows, prepareRow }) => (
  <AccordionGroup>
    {rows.map(row => {
      prepareRow(row);

      const { subRows, getRowProps, isExpanded, toggleRowExpanded } = row;

      const { key } = getRowProps();

      return (
        <AccordionItem
          key={key}
          expand={toggleRowExpanded}
          header={
            <StickyRow>
              <GroupingRow highlight groupingRow={row} level={GROUPING_ROW_LEVEL.FIRST} />
            </StickyRow>
          }
          isExpanded={isExpanded}
          nodesIds={[`${TURNOVERS_SCROLLER_ROW_CATEGORY_NODE}-${key}`, COMMON_SCROLLER_NODE]}
          panel={
            <AccountList
              key={key}
              nodesIds={[`${TURNOVERS_SCROLLER_ROW_SUBCATEGORY_NODE}-${key}`, `${TURNOVERS_SCROLLER_ROW_CATEGORY_NODE}-${key}`]}
              prepareRow={prepareRow}
              rows={subRows}
            />
          }
        />
      );
    })}
  </AccordionGroup>
);

ViewWithTwoLevels.displayName = 'ViewWithTwoLevels';
