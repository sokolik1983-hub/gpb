import type { Dispatch } from 'react';
import { useEffect, useMemo, useReducer, useState } from 'react';
import isEqual from 'fast-deep-equal';
import { useAccounts as useAccountsByFilter } from 'hooks/admin';
import { usePrevious } from 'hooks/common';
import type { AccountOptionProps } from 'pages/form/admin/views/statement-request/components';
import { getAccountOption } from 'pages/form/admin/views/statement-request/components';
import { useDebounce } from 'platform-copies/hooks';
import { DELAY } from 'stream-constants';
import { getAccountSearchFilter } from 'utils/admin';
import type { IFilters } from '@platform/core';

/** Типы редьюсера. */
export enum ACCOUNT_DEPS_ACTION_TYPE {
  /** Очистка состояния. */
  CLEAR = 'CLEAR',
  /** Установить коды типов счетов. */
  SET_ACCOUNT_TYPE_CODES = 'SET_ACCOUNT_TYPE_CODES',
  /** Установить идентификаторы организаций. */
  SET_ORGANIZATIONS = 'SET_ORGANIZATIONS',
  /** Установить идентификаторы подразделений обслуживания. */
  SET_SERVICE_BRANCHES = 'SET_SERVICE_BRANCHES',
}

/** Состояние редьюсера. */
interface State {
  /** Коды типов счетов. */
  accountTypeCodes: number[];
  /** Идентификаторы организаций. */
  organizationIds: string[];
  /** Идентификаторы подразделений обслуживания. */
  serviceBranchIds: string[];
}

/** Входные данные редьюсера. */
interface Action {
  /** Тип действия редьюсера. */
  type: ACCOUNT_DEPS_ACTION_TYPE;
  /** Переданные данные в редьюсер. */
  payload?: number[] | string[];
}

/** Выходные данные хука useAccounts. */
interface UseAccountsResponse {
  /** Список опций выбора счетов. */
  options: AccountOptionProps[];
  /** Dispatch установки зависимых полей. */
  setDep: Dispatch<Action>;
  /** Метод устанавливает подстроку поиска счетов. */
  setSearchValue(value: string): void;
}

/** Начальное состояние для редьюсера. */
const initialState: State = {
  accountTypeCodes: [],
  organizationIds: [],
  serviceBranchIds: [],
};

/**
 * Редьюсер работы с зависимостями счетов.
 *
 * @param state - Состояние.
 * @param action - Входные данные редьюсера.
 * @param action.payload - Переданные данные в редьюсер.
 * @param action.type - Тип действия редьюсера.
 */
const reducer = (state: State, { payload, type }: Action): State => {
  switch (type) {
    case ACCOUNT_DEPS_ACTION_TYPE.SET_ACCOUNT_TYPE_CODES: {
      return {
        ...state,
        accountTypeCodes: payload as number[],
      };
    }
    case ACCOUNT_DEPS_ACTION_TYPE.SET_ORGANIZATIONS: {
      return {
        ...state,
        organizationIds: payload as string[],
      };
    }
    case ACCOUNT_DEPS_ACTION_TYPE.SET_SERVICE_BRANCHES: {
      return {
        ...state,
        serviceBranchIds: payload as string[],
      };
    }
    case ACCOUNT_DEPS_ACTION_TYPE.CLEAR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

/** Конфиг соответствия полей состояния редьюсера и полей фильтра поиска на сервере. */
const fieldNameConfig: Record<keyof State, string> = {
  accountTypeCodes: 'accountTypeCode',
  organizationIds: 'clientUuid',
  serviceBranchIds: 'branchId',
};

/** Хук изменения списка выбора счетов. */
export const useAccounts = (): UseAccountsResponse => {
  const [searchValue, setSearchValue] = useState('');
  const [dep, setDep] = useReducer(reducer, initialState);

  const searchValueDebounced = useDebounce(searchValue, DELAY);

  const prevSearchValueDebounced = usePrevious(searchValueDebounced);

  useEffect(() => {
    if (prevSearchValueDebounced !== searchValueDebounced) {
      setDep({ type: ACCOUNT_DEPS_ACTION_TYPE.CLEAR });
    }
  }, [prevSearchValueDebounced, searchValueDebounced]);

  const filter: IFilters = useMemo(
    () =>
      Object.keys(dep).reduce<IFilters>((prevValue, item) => {
        const fieldName = fieldNameConfig[item];

        return dep[item].length > 0 ? { ...prevValue, [fieldName]: { condition: 'in', value: dep[item], fieldName } } : prevValue;
      }, {}),
    [dep]
  );

  const { data: searchOrganizations } = useAccountsByFilter(getAccountSearchFilter(searchValueDebounced), Object.keys(filter).length === 0);

  // TODO: Разобраться, почему не выбирается визуально в селекте счет, если указать второй параметр.
  const { data: dependentOrganizations } = useAccountsByFilter(filter);

  const options = useMemo(() => (isEqual(dep, initialState) ? searchOrganizations : dependentOrganizations).map(getAccountOption), [
    dep,
    dependentOrganizations,
    searchOrganizations,
  ]);

  return {
    options,
    setDep,
    setSearchValue,
  };
};
