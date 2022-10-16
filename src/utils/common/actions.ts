import { FORMAT } from 'interfaces/common';
import type { IFormState } from 'stream-constants/form';

/**
 *
 * Утилита для определения необходимости параметра `Итоги за день`.
 *
 * @param formState Стейт формы.
 */
export const isNeedTotalsOfDay = (formState: IFormState): boolean => {
  const { dateFrom, dateTo, format } = formState;

  return !!dateFrom && !!dateTo && dateFrom !== dateTo && (format === FORMAT.PDF || format === FORMAT.EXCEL);
};
