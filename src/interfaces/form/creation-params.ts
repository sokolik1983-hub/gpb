import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { locale } from 'localization';
import { exportCases } from 'utils/export-params-dialog';

/** Параметры создания запроса на выписку. */
export enum CREATION_PARAMS {
  /** Отдельный файл по каждому счёту. */
  SEPARATE_ACCOUNTS_FILES = 'separateAccountsFiles',
  /** Скрыть нулевые обороты. */
  HIDE_EMPTY_TURNOVERS = 'hideEmptyTurnovers',
  /** С электронной подписью банка в формате PDF. */
  WITH_SIGN = 'withSign',
  /** С комплектом документов. */
  WITH_DOCUMENTS_SET = 'withDocumentsSet',
}

/** Начальные значения параметров создания запроса выписки. */
export const defaultCreationParamsValue = {
  [CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES]: false,
  [CREATION_PARAMS.HIDE_EMPTY_TURNOVERS]: false,
  [CREATION_PARAMS.WITH_SIGN]: false,
  [CREATION_PARAMS.WITH_DOCUMENTS_SET]: false,
};

/** Начальные значения опций создания запроса выписки. */
export const getDefaultCreationParamsOptions = (useCase?: EXPORT_PARAMS_USE_CASES) => {
  const isExportOrDefault = !useCase || (useCase && exportCases.includes(useCase));

  return Object.keys(defaultCreationParamsValue).map(x => ({
    label: isExportOrDefault ? locale.common.creationParams[x] : locale.exportParamsDialog.print.creationParams[x],
    value: x,
  }));
};
