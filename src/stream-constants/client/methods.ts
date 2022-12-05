import { SCHEDULE_METHODS } from 'interfaces';
import { locale } from 'localization';

/** Способы получения выписки для выписок по расписанию. */
export const SCHEDULE_METHOD = {
  /** Сохранено. */
  [SCHEDULE_METHODS.SAVE]: locale.client.scheduleMethods.save,
  /** Электронная почта. */
  [SCHEDULE_METHODS.EMAIL]: locale.client.scheduleMethods.email,
};
