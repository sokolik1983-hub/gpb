import React from 'react';
import { ScrollerPlaceholder } from 'components/scroller-placeholder';
import { ScrollerSpinnerPlaceholder } from 'components/scroller-spinner-placeholder';
import type { TableInstance } from 'react-table';
import { Box } from '@platform/ui';
import css from './styles.scss';
import { TableBody } from './table-body';
import { TableHeader } from './table-header';

/** Свойства компонента ScrollerTableView. */
export interface IScrollerTableViewProps<Row extends Record<string, any>> {
  /** Экземпляр таблицы. */
  tableInstance: TableInstance<Row>;
  /** Если true - то идёт процесс запроса данных, для отображения в таблице. */
  isLoading: boolean;
  /** Лейбл плейсхолдера. */
  placeholderLabel: string;
}

/**
 * Таблица скроллера. Реализована как глупый компонент.
 * Предполагается использовать её во всех скроллерах стрима.
 */
export const ScrollerTableView = <Row extends Record<string, any>>({
  tableInstance,
  isLoading,
  placeholderLabel,
}: IScrollerTableViewProps<Row>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  let tableContent: React.ReactNode;

  if (!isLoading && rows.length === 0) {
    tableContent = <ScrollerPlaceholder label={placeholderLabel} />;
  } else if (isLoading) {
    tableContent = <ScrollerSpinnerPlaceholder />;
  } else {
    tableContent = <TableBody prepareRow={prepareRow} rows={rows} {...getTableBodyProps()} />;
  }

  return (
    <Box className={css.tableWrapper}>
      <Box {...getTableProps()} className={css.table}>
        <TableHeader headerGroups={headerGroups} />
        {tableContent}
      </Box>
    </Box>
  );
};

ScrollerTableView.displayName = 'ScrollerTableView';
