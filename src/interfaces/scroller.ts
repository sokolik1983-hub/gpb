import type { SortingRule } from 'react-table';

/** Стейт сортировки таблицы скроллера. */
export type Sorting = Array<SortingRule<Record<string, unknown>>>;

/** Стейт пагинации таблицы скроллера. */
export interface IPagination {
  /** Количество записей на странице. */
  pageSize: number;
  /** Номер текущей страницы. Нумерация начинается с нуля. */
  pageIndex: number;
}
