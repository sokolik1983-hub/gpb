import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { locale } from 'localization';

/** Начальные значения параметров создания запроса выписки. */
export const defaultCreationParamsValues = {
  [CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES]: false,
  [CREATION_PARAMS.WITH_PDF_SIGN]: false,
  [CREATION_PARAMS.WITH_DOCUMENTS_SET]: false,
  [CREATION_PARAMS.HIDE_EMPTY_TURNOVERS]: false,
  [CREATION_PARAMS.TOTALS_OF_DAY]: false,
  [CREATION_PARAMS.REVALUATION_ACCOUNTING_ENTRY]: false,
  [CREATION_PARAMS.NATIONAL_CURRENCY]: false,
};

/** Начальные значения опций создания запроса выписки. */
export const defaultCreationParamsOptions = Object.keys(defaultCreationParamsValues).map(x => ({
  label: locale.common.creationParams[x],
  value: x,
}));
