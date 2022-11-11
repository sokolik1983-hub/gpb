import { createContext } from 'react';
import type { IFilterPanel, ITagsPanel } from 'interfaces';
import type { Counterparty } from 'interfaces/admin';
import type { BankClient } from 'interfaces/common';
import { noop } from 'utils/common';
import type { IFormState } from './interfaces';

/** Контекст скроллера "Проводки". */
export interface IFilterContext {
  /** Свойства панели фильтрации. */
  filterPanel: IFilterPanel<IFormState>;
  /** Свойства тегов. */
  tagsPanel: ITagsPanel;
  /** Контрагенты. */
  counterparties: Counterparty[];
  /** Клиенты. */
  clients: BankClient[];
}

/** Дефолтное состояние контекста скроллера. */
const DEFAULT_CONTEXT_VALUE: IFilterContext = {
  clients: [],
  counterparties: [],
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
