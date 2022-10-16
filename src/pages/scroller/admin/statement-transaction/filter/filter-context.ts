import { createContext } from 'react';
import type { IFilterPanel, ITagsPanel } from 'interfaces';
import { noop } from 'utils/common';
import type { IBankClient, IFormState } from './interfaces';

/** Контекст скроллера "Проводки". */
export interface IFilterContext {
  /** Свойства панели фильтрации. */
  filterPanel: IFilterPanel<IFormState>;
  /** Свойства тегов. */
  tagsPanel: ITagsPanel;
  /** Контрагенты. */
  counterparties: IBankClient[];
  /** Счета контрагентов. */
  counterpartiesAccounts: string[];
  /** Клиенты. */
  clients: IBankClient[];
  /** Счета клиентов. */
  clientsAccounts: string[];
}

/** Дефолтное состояние контекста скроллера. */
const DEFAULT_CONTEXT_VALUE: IFilterContext = {
  clients: [],
  clientsAccounts: [],
  counterparties: [],
  counterpartiesAccounts: [],
  tagsPanel: {
    tags: [],
    onRemoveAllTags: noop,
    onRemoveTag: noop,
    onClick: noop,
  },
  filterPanel: {
    values: {},
    onClose: noop,
    onOk: noop,
    onClear: noop,
    opened: false,
  },
};

/** Контекст скроллера "Проводки". */
export const FilterContext = createContext<IFilterContext>(DEFAULT_CONTEXT_VALUE);
