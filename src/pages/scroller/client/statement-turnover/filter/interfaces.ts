import type { DATE_PERIODS, IGetTurnoversRequestDto } from 'interfaces/client';

/** Стейт формы фильтрации. */
export type FormState = Omit<IGetTurnoversRequestDto, 'multiSort'> & {
  /** Временной период. */
  datePeriod: DATE_PERIODS;
  /** Выбранные организации. */
  organizations: string[];
};
