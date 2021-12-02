import { createContext } from 'react';
import type { IFilterPanel, Sorting } from 'interfaces';
import type { IGetAccountsResponseDto, IGetTurnoversResponseDto } from 'interfaces/client';
import { GROUPING_VALUES, DATE_PERIODS } from 'interfaces/client';
import { noop } from 'utils';
import type { IFormState } from './filter/interfaces';
import { COLUMN_NAMES } from './table/constatnts';

/** Состояние фильтров по умолчанию. */
export const DEFAULT_SORTING: Sorting = [{ id: COLUMN_NAMES.INCOME, desc: true }];

/** Контекст скроллера "Обороты". */
export interface ITurnoverScrollerContext {
  /** Ошибка сетевого запроса. */
  hasError: boolean;
  /** Устанавливает ошибку. */
  setHasError(value: boolean): void;
  /** Флаг ожидания выполнения запроса. */
  isLoading: boolean;
  /** Устанавливает флаг ожидания выполнения запроса. */
  setIsLoading(value: boolean): void;
  /** Свойства панели фильтрации. */
  filterPanel: IFilterPanel<IFormState>;
  /** Счета пользователя, для использования в селекте выбора счёта. */
  accounts: IGetAccountsResponseDto[];
  /** Сортировка. */
  sorting?: Sorting;
  /** Установить сортировку. */
  setSorting?(value: Sorting): void;
  /** Данны для отображения в таблице оборотов. */
  turnovers: IGetTurnoversResponseDto;
}

/** Дефолтное состояние контекста скроллера. */
const DEFAULT_CONTEXT_VALUE: ITurnoverScrollerContext = {
  hasError: false,
  setHasError: noop,
  isLoading: false,
  setIsLoading: noop,
  accounts: [],
  sorting: DEFAULT_SORTING,
  setSorting: noop,
  turnovers: {
    total: [],
    accounts: [],
  },
  filterPanel: {
    values: {
      accounts: [],
      onlyActiveAccounts: true,
      groupBy: GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES,
      datePeriod: DATE_PERIODS.YESTERDAY,
      dateTo: '',
      dateFrom: '',
    },
    onClose: noop,
    onOk: noop,
    onClear: noop,
    opened: false,
  },
};

/** Контекст скроллера "Обороты". */
export const TurnoverScrollerContext = createContext<ITurnoverScrollerContext>(DEFAULT_CONTEXT_VALUE);
