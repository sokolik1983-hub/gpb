import React from 'react';
import { HeaderRow } from 'components/scroller-table-view/header-row';
import type { RecordCell } from 'components/scroller-table-view/types';
import type { HeaderGroup } from 'react-table';

/** Свойства шапки таблицы. */
interface TableHeaderProps {
  /** Группа заголовков таблицы. */
  headerGroups: Array<HeaderGroup<RecordCell>>;
  /** Признак мультисортировки. */
  disableMultiSort: boolean;
}

/** Шапка таблицы. */
export const TableHeader: React.FC<TableHeaderProps> = ({ disableMultiSort, headerGroups }) => (
  <thead>
    {headerGroups.map(headerGroup => {
      const { key } = headerGroup.getHeaderGroupProps();

      return <HeaderRow key={key} disableMultiSort={disableMultiSort} {...headerGroup} />;
    })}
  </thead>
);

TableHeader.displayName = 'TableHeader';
