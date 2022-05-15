import React from 'react';
import cn from 'classnames';
import { HeaderCell } from 'components/scroller-table-view/header-cell';
import type { RecordCell } from 'components/scroller-table-view/types';
import type { HeaderGroup } from 'react-table';
import css from './styles.scss';

/** Свойства строки шапки таблицы. */
interface HeaderRowProps extends HeaderGroup<RecordCell> {
  /** Признак мультисортировки. */
  disableMultiSort: boolean;
}

/** Компонент строки шапки таблицы. */
export const HeaderRow: React.FC<HeaderRowProps> = ({ headers, disableMultiSort, getHeaderGroupProps }) => {
  const { className, style } = getHeaderGroupProps();

  return (
    <tr className={cn(className, css.headerRow)} style={style}>
      {headers.map((column, index) => (
        <HeaderCell key={column.id} column={column} disableMultiSort={disableMultiSort} isLastColumn={index === headers.length - 1} />
      ))}
    </tr>
  );
};
