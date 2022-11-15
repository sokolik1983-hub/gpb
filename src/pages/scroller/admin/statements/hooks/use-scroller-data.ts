import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import type { StatementHistoryRow } from 'interfaces/admin';
import type { IFilters } from '@platform/core';

/** Выходные данные хука useScrollerData. */
interface UseScrollerDataResponse {
  /** Признак инициализации периода дат. */
  datePeriodInitialed: boolean;
  /** Данные фильтра скроллера. */
  filter: IFilters;
  /** Признак окончания расчета периода дат. */
  setDatePeriodFetched(): void;
  /** Функция установки фильтра скроллера. */
  setFilter: Dispatch<SetStateAction<IFilters>>;
  /** Функция установки выписок. */
  setStatements: Dispatch<SetStateAction<StatementHistoryRow[]>>;
  /** Выписки. */
  statements: StatementHistoryRow[];
}

/** Хук, возвращающий необходимые данные для скроллреа выписок. */
export const useScrollerData = (): UseScrollerDataResponse => {
  const [filter, setFilter] = useState<IFilters>({});
  const [statements, setStatements] = useState<StatementHistoryRow[]>([]);
  const [datePeriodInitialed, setDatePeriodInitialed] = useState(false);

  const setDatePeriodFetched = useCallback(() => {
    if (!datePeriodInitialed) {
      setDatePeriodInitialed(true);
    }
  }, [datePeriodInitialed]);

  return { datePeriodInitialed, filter, setDatePeriodFetched, setFilter, setStatements, statements };
};
