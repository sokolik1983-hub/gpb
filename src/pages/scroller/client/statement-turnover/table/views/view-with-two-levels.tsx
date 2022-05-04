import React from 'react';
import { AccordionGroup, AccordionItem, StickyRow } from 'components';
import { AccountList } from '../account-list';
import { GroupingRow } from '../grouping-row';
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
              <GroupingRow groupingRow={row} />
            </StickyRow>
          }
          isExpanded={isExpanded}
          panel={<AccountList prepareRow={prepareRow} rows={subRows} />}
        />
      );
    })}
  </AccordionGroup>
);

ViewWithTwoLevels.displayName = 'ViewWithTwoLevels';
