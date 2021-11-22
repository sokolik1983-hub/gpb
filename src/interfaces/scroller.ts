import type { SortingRule } from 'react-table';

/** Стейт сортировки таблицы скроллера. */
export type Sorting = Array<SortingRule<Record<string, unknown>>>;
