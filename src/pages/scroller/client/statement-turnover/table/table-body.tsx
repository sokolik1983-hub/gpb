import type { FC } from 'react';
import React, { useContext, useRef } from 'react';
import { StickyRowsContext, StickyRow, ScrollerLoadingOverlay } from 'components';
import { useScrollButton } from 'hooks/use-scroll-button';
import type { IAccountTurnoversInfo, IGroupedAccounts } from 'interfaces/dto';
import { GROUPING_VALUES, GROUPING_TYPE } from 'interfaces/dto';
import type Scrollbars from 'react-custom-scrollbars';
import type { TableBodyProps, Row } from 'react-table';
import { Box, LayoutScrollComponent, Gap, ROLE } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { AccountInfoRow } from './account-row';
import { GroupingRow } from './grouping-row';
import css from './styles.scss';
import { ToggleRowsVisibilityButton } from './toggle-rows-visibility-button';

/**
 * Возвращает видимые строки и флаг управляющий видимостью кнопки.
 *
 * @param groupingRow - Блок со сгруппированными счетами.
 * @param grouping - Группировка выбранная в фильтре скроллера.
 */
const getVisibleRows = (groupingRow: Row<IGroupedAccounts>, grouping: GROUPING_VALUES) => {
  const isExpandButtonVisible = Boolean(
    groupingRow.subRows?.length && groupingRow.subRows.length > 3 && grouping !== GROUPING_VALUES.NO_GROUPING
  );

  let visibleRows: Array<Row<IGroupedAccounts>>;

  if (isExpandButtonVisible) {
    visibleRows = groupingRow.isExpanded ? groupingRow.subRows : groupingRow.subRows.slice(0, 3);
  } else {
    visibleRows = groupingRow.subRows;
  }

  return {
    isExpandButtonVisible,
    visibleRows,
  };
};

/** Свойства компонента TableBody. */
export interface ITableBodyProps extends TableBodyProps {
  /**
   * Метод, который необходимо вызывать перед рендерингом строки.
   *
   * @see https://react-table.tanstack.com/docs/api/useTable#instance-properties
   */
  prepareRow(row: Row<IGroupedAccounts>): void;
  /** Строки таблицы. */
  rows: Array<Row<IGroupedAccounts>>;
}

/** Тело таблицы. */
export const TableBody: FC<ITableBodyProps> = ({ rows, prepareRow, ...tableBodyProps }) => {
  const { isLoading, groupByForRender } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const { setScrollPosition, portalRef } = useContext(StickyRowsContext);

  const scrolledElementRef = useRef<Scrollbars>();

  const {
    handleScrollButtonClick,
    ScrollIcon,
    handleScroll: handleScrollFromScrollButton,
    isScrollButtonVisible,
    setScrolledElementRef: setScrolledElementRefFromScrollButton,
  } = useScrollButton();

  const setScrolledElementRef = ref => {
    scrolledElementRef.current = ref;
    setScrolledElementRefFromScrollButton(ref);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    handleScrollFromScrollButton(e);
    setScrollPosition(e.currentTarget.scrollTop);
  };

  return (
    <Box className={css.layoutScrollWrapper}>
      <LayoutScrollComponent innerRef={setScrolledElementRef} onScroll={handleScroll}>
        {/* Элемент внутри которого будут рендерится сроки в состоянии стики. */}
        <div ref={portalRef} className={css.portal} style={{ top: scrolledElementRef.current?.getScrollTop() }} />
        <Box {...tableBodyProps} className={css.tableBody}>
          {rows.map(groupingRow => {
            prepareRow(groupingRow);

            const {
              original: { groupInfo: { groupingType } = {} },
              getRowProps,
            } = groupingRow;

            const { key: groupingRowKey } = getRowProps();

            const { isExpandButtonVisible, visibleRows } = getVisibleRows(groupingRow, groupByForRender);

            return (
              <>
                {/* Группирующая строка. */}
                {groupByForRender !== GROUPING_VALUES.NO_GROUPING && (
                  <StickyRow
                    key={groupingRowKey}
                    secondLevelRow={
                      groupByForRender === GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES && groupingType === GROUPING_TYPE.CURRENCIES
                    }
                  >
                    <GroupingRow groupingRow={groupingRow} />
                  </StickyRow>
                )}

                {/* Строки с информаций по счетам. */}
                {visibleRows?.map(accountInfoRow => {
                  prepareRow(accountInfoRow);

                  const { key: accountInfoRowKey } = accountInfoRow.getRowProps();

                  return (
                    <AccountInfoRow key={accountInfoRowKey} accountInfoRow={(accountInfoRow as unknown) as Row<IAccountTurnoversInfo>} />
                  );
                })}

                {/* Кнопка скрытия раскрытия счетов. */}
                {isExpandButtonVisible && <ToggleRowsVisibilityButton groupingRow={groupingRow} />}
              </>
            );
          })}
          {isLoading && <ScrollerLoadingOverlay />}
        </Box>
        <Gap.X2L />
        <Gap.X2L />
      </LayoutScrollComponent>

      {/* Кнопка прокрутки таблицы. */}
      {isScrollButtonVisible && (
        <Box
          inverse
          className={css.scrollIconBox}
          fill="BASE"
          radius="MAX"
          role={ROLE.BUTTON}
          shadow="MD"
          onClick={handleScrollButtonClick}
        >
          {<ScrollIcon fill={'BASE'} scale={'MD'} />}
        </Box>
      )}
    </Box>
  );
};

TableBody.displayName = 'TableBody';
