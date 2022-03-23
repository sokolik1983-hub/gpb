import React from 'react';
import cn from 'classnames';
import { Row } from 'components/scroller-table-view/row';
import type { RecordCell } from 'components/scroller-table-view/types';
import type { TableBodyProps as TableBodyPropsPure, TableInstance } from 'react-table';
import css from './styles.scss';

/** Свойства компонента тела таблицы. */
export interface TableBodyProps extends TableBodyPropsPure {
  /** Экземпляр таблицы. */
  tableInstance: TableInstance<RecordCell>;
  /** Признак отображения только выбранных строк. */
  isVisibleOnlySelectedRows?: boolean;
  /** Обработчик клика по строке. */
  onClick?(row: RecordCell): void;
}

/** Компонент тела таблицы. */
export const TableBody: React.FC<TableBodyProps> = ({
  isVisibleOnlySelectedRows,
  onClick,
  tableInstance: { getTableBodyProps, rows, prepareRow },
}) => {
  const { className, style } = getTableBodyProps();

  return (
    <tbody className={cn(className, css.tableBody)} style={style}>
      {rows.map(row => {
        prepareRow(row);

        const { id, isSelected } = row;

        const isRowVisible = isVisibleOnlySelectedRows ? isSelected : true;

        return isRowVisible && <Row key={id} {...row} onClick={onClick} />;
      })}
    </tbody>
  );
};

TableBody.displayName = 'TableBody';
