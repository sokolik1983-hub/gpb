import type { FC } from 'react';
import React from 'react';
import { useScrollButton } from 'hooks/use-scroll-button';
import type { TableBodyProps, TableInstance } from 'react-table';
import { Box, LayoutScroll, ROLE, Gap } from '@platform/ui';
import { PAGE_SIZES, Pagination } from '../pagination';
import { ScrollerLoadingOverlay } from '../scroller-loading-overlay';
import { TableRow } from '../scroller-table-view/row';
import css from './styles.scss';

/** Свойства компонента TableBody. */
export interface ITableBodyProps extends TableBodyProps {
  /** Экземпляр таблицы. */
  tableInstance: TableInstance<Record<string, any>>;
  /** Если true - то идёт процесс запроса данных, для отображения в таблице. */
  isLoading: boolean;
}

/** Тело таблицы. */
export const TableBody: FC<ITableBodyProps> = ({ tableInstance, isLoading }) => {
  const {
    getTableBodyProps,
    rows,
    prepareRow,
    pageCount,
    state: { pageSize },
  } = tableInstance;

  const { handleScrollButtonClick, ScrollIcon, handleScroll, isScrollButtonVisible, setScrolledElementRef } = useScrollButton();

  return (
    <Box className={css.layoutScrollWrapper}>
      <LayoutScroll innerRef={setScrolledElementRef} onScroll={handleScroll}>
        <Box {...getTableBodyProps()} className={css.tableBody}>
          {rows.map(row => {
            prepareRow(row);

            const { key: accountInfoRowKey } = row.getRowProps();

            return <TableRow key={accountInfoRowKey} row={row} />;
          })}
          {isLoading && <ScrollerLoadingOverlay />}
        </Box>
        {pageCount * pageSize > PAGE_SIZES.PER_25 && <Pagination tableInstance={tableInstance} />}
        <Gap.X2L />
      </LayoutScroll>

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
