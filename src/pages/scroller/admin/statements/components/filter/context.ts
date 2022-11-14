import { createContext } from 'react';
import type { IFilterPanel, ITagsPanel } from 'interfaces';
import type { Account, Organization, ServiceBranch, User } from 'interfaces/admin';
import type { FilterValues } from 'pages/scroller/admin/statements/components/filter/types';
import { noop } from '@platform/ui';

/** Свойства контекста фильтра. */
export interface FilterContextProps {
  /** Счета. */
  accounts: Account[];
  /** Свойства панели фильтрации. */
  filterPanel: IFilterPanel<FilterValues>;
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
  /** Устанавливает признак завершения расчитывания периода. */
  setDatePeriodFetched(): void;
  /** Установить подстроку поиска организации. */
  setOrganizationSearchValue(value: string): void;
  /** Установить подстроку поиска пользователя. */
  setUserSearchValue(value: string): void;
  /** Свойства тегов. */
  tagsPanel: ITagsPanel;
  /** Пользователи. */
  users: User[];
}

/** Значения по умолчанию контекста для фильтра. */
const defaultValue: FilterContextProps = {
  accounts: [],
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
  users: [],
};

/** Контекст фильтра. */
export const FilterContext = createContext<FilterContextProps>(defaultValue);
