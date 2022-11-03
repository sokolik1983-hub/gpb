import type { Dispatch, SetStateAction } from 'react';
import type { IFilters } from '@platform/core';

/** Свойства фильтра. */
export interface FilterProps {
  /** Метод устанавливает состояние фильтра. */
  setFilter: Dispatch<SetStateAction<IFilters>>;
}
