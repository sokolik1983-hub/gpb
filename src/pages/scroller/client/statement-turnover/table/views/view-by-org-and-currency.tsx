import React, { useMemo } from 'react';
import { AccordionGroup, AccordionItem, StickyRow } from 'components';
import type { IGroupedAccounts } from 'interfaces/dto';
import { GROUPING_TYPE } from 'interfaces/dto';
import type { Row } from 'react-table';
import {
  COMMON_SCROLLER_NODE,
  TURNOVERS_SCROLLER_ROW_CATEGORY_NODE,
  TURNOVERS_SCROLLER_ROW_SUBCATEGORY_NODE,
} from 'stream-constants/a11y-nodes';
import { AccountList } from '../account-list';
import { GROUPING_ROW_LEVEL, GroupingRow } from '../grouping-row';
import type { IScrollerView } from '../table-body';

/**
 * Компонент просмотра таблицы, сгруппированной по организациям и валютам.
 */
export const ViewByOrgAndCurrency: React.FC<IScrollerView> = ({ rows, prepareRow }) => {
  /**
   * Форматирование строк для создание иерархии с тремя уровнями вложенности.
   * Необходимо, т.к с бека приходит плоский список
   * при данном типе группировки.
   */
  const formattedRows = useMemo(
    () =>
      rows.reduce<Array<Row<IGroupedAccounts>>>((acc, row) => {
        const { original } = row;

        if (original.groupInfo.groupingType === GROUPING_TYPE.ORGANIZATIONS) {
          acc.push({ ...row, original: { ...original } });
        }

        if (original.groupInfo.groupingType === GROUPING_TYPE.CURRENCIES && acc.length > 0) {
          const organization = acc.find(org => org.original.groupInfo.organizationName === original.groupInfo.organizationName);

          if (organization) {
            organization.subRows = [row, ...(organization.subRows ? organization.subRows : [])];
          }
        }

        return acc;
      }, []),
    [rows]
  );

  return (
    <AccordionGroup>
      {formattedRows.map(orgRow => {
        prepareRow(orgRow);

        const { subRows: currencyRows, getRowProps, isExpanded: isOrgExpanded, toggleRowExpanded: toggleOrgRow } = orgRow;

        const { key: orgRowKey } = getRowProps();

        /**
         * Рендерим строки валют и счетов.
         */
        const CurrencyList = currencyRows?.map(row => {
          prepareRow(row);

          const { getRowProps: getCurrencyRowProps, isExpanded: isCurrencyExpanded, subRows, toggleRowExpanded } = row;

          const { key } = getCurrencyRowProps();

          return (
            <AccordionItem
              key={key}
              expand={toggleRowExpanded}
              header={
                <StickyRow secondLevelRow>
                  <GroupingRow highlight groupingRow={row} level={GROUPING_ROW_LEVEL.SECOND} />
                </StickyRow>
              }
              isExpanded={isCurrencyExpanded}
              nodesIds={[`${TURNOVERS_SCROLLER_ROW_SUBCATEGORY_NODE}-${key}`, `${TURNOVERS_SCROLLER_ROW_CATEGORY_NODE}-${orgRowKey}`]}
              panel={
                <AccountList
                  key={key}
                  nodesIds={[`${TURNOVERS_SCROLLER_ROW_SUBCATEGORY_NODE}-${key}`, `${TURNOVERS_SCROLLER_ROW_CATEGORY_NODE}-${orgRowKey}`]}
                  prepareRow={prepareRow}
                  rows={subRows}
                />
              }
            />
          );
        });

        return (
          <AccordionItem
            key={orgRowKey}
            expand={toggleOrgRow}
            header={
              <StickyRow>
                <GroupingRow primary groupingRow={orgRow} level={GROUPING_ROW_LEVEL.FIRST} />
              </StickyRow>
            }
            isExpanded={isOrgExpanded}
            nodesIds={[`${TURNOVERS_SCROLLER_ROW_CATEGORY_NODE}-${orgRowKey}`, COMMON_SCROLLER_NODE]}
            panel={<AccordionGroup disabled={!isOrgExpanded}>{CurrencyList}</AccordionGroup>}
          />
        );
      })}
    </AccordionGroup>
  );
};

ViewByOrgAndCurrency.displayName = 'ViewByOrgAndCurrency';
