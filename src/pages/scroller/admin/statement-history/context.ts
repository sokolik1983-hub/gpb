import { createContext } from 'react';
import type { IFilterPanel, ITagsPanel } from 'interfaces';
import type { Account, Organization, ServiceBranch, StatementHistoryRow, User } from 'interfaces/admin';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { noop } from '@platform/ui';
import type { FilterValues } from './filter/types';

/** Свойства контекста скроллера "История запросов". */
export interface StatementHistoryScrollerContextProps {
  /** Счета. */
  accounts: Account[];
  /** Свойства панели фильтрации. */
  filterPanel: IFilterPanel<FilterValues>;
  /** Делает запрос выписок на сервер. */
  fetchStatements(params: IFetchDataParams): Promise<IFetchDataResponse<StatementHistoryRow>>;
  /** Организации. */
  organizations: Organization[];
  /** Выбранные счета (из Session Storage). */
  selectedAccounts: Account[];
  /** Выбранные организации (из Session Storage). */
  selectedOrganizations: Organization[];
  /** Выбранные пользователи (из Session Storage). */
  selectedUsers: User[];
  /** Подразделения обслуживания. */
  serviceBranches: ServiceBranch[];
  /** Установить подстроку поиска счета. */
  setAccountSearchValue(value: string): void;
  /** Устанавливает признак завершения рассчитывания периода. */
  setDatePeriodFetched(): void;
  /** Установить подстроку поиска организации. */
  setOrganizationSearchValue(value: string): void;
  /** Установить подстроку поиска пользователя. */
  setUserSearchValue(value: string): void;
  /** Свойства тегов. */
  tagsPanel: ITagsPanel;
  /** Общее количество выписок по запросу. */
  totalStatements: number;
  /** Пользователи. */
  users: User[];
}

/** Дефолтные значения контекста скроллера "История запросов". */
const defaultValue: StatementHistoryScrollerContextProps = {
  accounts: [],
  fetchStatements: () => Promise.resolve({ rows: [], pageCount: 0 }),
  filterPanel: {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    values: {} as FilterValues,
    onClose: noop,
    onOk: noop,
    onClear: noop,
    opened: false,
  },
  organizations: [],
  selectedAccounts: [],
  selectedOrganizations: [],
  selectedUsers: [],
  serviceBranches: [],
  setAccountSearchValue: noop,
  setDatePeriodFetched: noop,
  setOrganizationSearchValue: noop,
  setUserSearchValue: noop,
  tagsPanel: {
    tags: [],
    onRemoveAllTags: noop,
    onRemoveTag: noop,
    onClick: noop,
  },
  totalStatements: 0,
  users: [],
};

/** Контекст скроллера "История запросов". */
export const StatementHistoryScrollerContext = createContext<StatementHistoryScrollerContextProps>(defaultValue);

StatementHistoryScrollerContext.displayName = 'StatementHistoryScrollerContext';
