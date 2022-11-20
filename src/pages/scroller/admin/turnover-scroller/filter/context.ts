import type React from 'react';
import { createContext } from 'react';
import type { IFilterPanel } from 'interfaces';
import type { Account, Organization } from 'interfaces/admin';
import { noop } from '@platform/ui';
import type { FilterValues } from './types';

/** Свойства контекста фильтра. */
export interface FilterContextProps {
  /** Счета. */
  accounts: Account[];
  /** Свойства панели фильтрации. */
  filterPanel: IFilterPanel<FilterValues>;
  /** Организации. */
  organizations: Organization[];
  /** Выбранные счета (из sessionStorage). */
  selectedAccounts: Account[];
  /** Выбранные организации (из sessionStorage). */
  selectedOrganizations: Organization[];
  /** Установить подстроку поиска счета. */
  setAccountSearchValue: React.Dispatch<React.SetStateAction<string>>;
  /** Установить подстроку поиска организации. */
  setOrganizationSearchValue: React.Dispatch<React.SetStateAction<string>>;
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
  setOrganizationSearchValue: noop,
  setAccountSearchValue: noop,
};

/** Контекст фильтра. */
export const FilterContext = createContext<FilterContextProps>(defaultValue);
