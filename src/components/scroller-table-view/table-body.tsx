import type { FC } from 'react';
import React from 'react';
import { useScrollButton } from 'hooks/use-scroll-button';
import type { IPagination } from 'interfaces';
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
  /** Обработчик клика по строке. */
  onClick?(row: Record<string, any>): void;
  /** Если true - то отображаются только выбранные строки. */
  isVisibleOnlySelectedRows?: boolean;
  /** Устанавливает пагинацию. */
  setPagination(value: IPagination): void;
}

/** Тело таблицы. */
export const TableBody: FC<ITableBodyProps> = ({ tableInstance, isLoading, onClick, isVisibleOnlySelectedRows, setPagination }) => {
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
        <Box role={ROLE.GRID} {...getTableBodyProps()} className={css.tableBody}>
          {rows.map(row => {
            prepareRow(row);

            const { getRowProps, isSelected } = row;

            const { key: accountInfoRowKey } = getRowProps();

            const isRowVisible = isVisibleOnlySelectedRows ? isSelected : true;

            return isRowVisible && <TableRow key={accountInfoRowKey} row={row} onClick={onClick} />;
          })}
          {isLoading && <ScrollerLoadingOverlay />}
        </Box>
        {pageCount * pageSize > PAGE_SIZES.PER_25 && <Pagination setPagination={setPagination} tableInstance={tableInstance} />}
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
