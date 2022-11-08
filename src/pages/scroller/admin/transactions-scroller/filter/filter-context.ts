import { createContext } from 'react';
import type { IFilterPanel, ITagsPanel } from 'interfaces';
import { noop } from 'utils/common';
import type { IFormState } from './interfaces';

/** Контекст скроллера "Проводки". */
export interface IFilterContext {
  /** Свойства панели фильтрации. */
  filterPanel: IFilterPanel<IFormState>;
  /** Свойства тегов. */
  tagsPanel: ITagsPanel;
}

/** Дефолтное состояние контекста скроллера. */
const DEFAULT_CONTEXT_VALUE: IFilterContext = {
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
