import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { locale } from 'localization';

/** Начальные значения параметров создания заявки выписки по расписанию. */
export const defaultCreationParamsValues = {
  [CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES]: false,
  [CREATION_PARAMS.WITH_PDF_SIGN]: false,
  [CREATION_PARAMS.HIDE_EMPTY_TURNOVERS]: false,
  [CREATION_PARAMS.WITH_DOCUMENTS_SET]: false,
};

/** Начальные значения опций создания заявки выписки по расписанию. */
export const defaultCreationParamsOptions = Object.keys(defaultCreationParamsValues).map(x => ({
  label: locale.common.creationParams[x],
  value: x,
}));
