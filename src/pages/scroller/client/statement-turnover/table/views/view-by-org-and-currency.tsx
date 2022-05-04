import React, { useMemo } from 'react';
import { AccordionGroup, AccordionItem, StickyRow } from 'components';
import type { IGroupedAccounts } from 'interfaces/dto';
import { GROUPING_TYPE } from 'interfaces/dto';
import type { Row } from 'react-table';
import { AccountList } from '../account-list';
import { GroupingRow } from '../grouping-row';
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
                  <GroupingRow groupingRow={row} />
                </StickyRow>
              }
              isExpanded={isCurrencyExpanded}
              panel={<AccountList key={key} prepareRow={prepareRow} rows={subRows} />}
            />
          );
        });

        return (
          <AccordionItem
            key={orgRowKey}
            expand={toggleOrgRow}
            header={
              <StickyRow>
                <GroupingRow groupingRow={orgRow} />
              </StickyRow>
            }
            isExpanded={isOrgExpanded}
            panel={<AccordionGroup disabled={!isOrgExpanded}>{CurrencyList}</AccordionGroup>}
          />
        );
      })}
    </AccordionGroup>
  );
};

ViewByOrgAndCurrency.displayName = 'ViewByOrgAndCurrency';
