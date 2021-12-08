import type { FC } from 'react';
import React from 'react';
import { TableRow } from 'components/scroller-table-view/row';
import { useScrollButton } from 'hooks/use-scroll-button';
import type { TableBodyProps, Row } from 'react-table';
import { Box, LayoutScroll, ROLE } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента TableBody. */
export interface ITableBodyProps extends TableBodyProps {
  /**
   * Метод, который необходимо вызывать перед рендерингом строки.
   *
   * @see {@link https://react-table.tanstack.com/docs/api/useTable#instance-properties}
   */
  prepareRow(row: Row<Record<string, any>>): void;
  /** Строки таблицы. */
  rows: Array<Row<Record<string, any>>>;
}

/** Тело таблицы. */
export const TableBody: FC<ITableBodyProps> = ({ rows, prepareRow, ...tableBodyProps }) => {
  const { handleScrollButtonClick, ScrollIcon, handleScroll, isScrollButtonVisible, setScrolledElementRef } = useScrollButton();

  return (
    <Box className={css.layoutScrollWrapper}>
      <LayoutScroll innerRef={setScrolledElementRef} onScroll={handleScroll}>
        <Box {...tableBodyProps} className={css.tableBody}>
          {rows.map(row => {
            prepareRow(row);

            const { key: accountInfoRowKey } = row.getRowProps();

            return <TableRow key={accountInfoRowKey} row={row} />;
          })}
        </Box>
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
