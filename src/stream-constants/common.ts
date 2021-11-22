import { locale } from 'localization';
import { ACCOUNT_TYPE } from '@platform/services';

/** Названия типов счетов. */
export const ACCOUNT_TYPE_LABELS = {
  /** Рассчетный. */
  [ACCOUNT_TYPE.CHECKING]: locale.accountType.labels.checking,
  /** Счет исполнителя ГК. */
  [ACCOUNT_TYPE.GOZ]: locale.accountType.labels.goz,
  /** Счет головного исполнителя ГК. */
  [ACCOUNT_TYPE.MAIN_GOZ]: locale.accountType.labels.mainGoz,
  /** Счёт участника закупок. */
  [ACCOUNT_TYPE.PARTICIPANT]: locale.accountType.labels.participant,
};
