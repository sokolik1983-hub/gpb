import { locale } from 'localization';

export const SEPARATE_ACCOUNTS_FILES = 'separateAccountsFiles';
export const WITH_SIGN = 'withSign';
export const WITH_DOCUMENTS_SET = 'withDocumentsSet';

/** Параметры при создании запроса на выписку. */
export interface ICreationParams {
  /** Отдельный файл по каждому счёту. */
  separateAccountsFiles: boolean;
  /** Скрыть нулевые обороты. */
  hideEmptyTurnovers: boolean;
  /** С электронной подписью банка в формате PDF. */
  withSign: boolean;
  /** С комплектом документов. */
  withDocumentsSet: boolean;
}

export const defaultCreationParamsValue: ICreationParams = {
  hideEmptyTurnovers: false,
  separateAccountsFiles: false,
  withDocumentsSet: false,
  withSign: false,
};

export const defaultCreationParamsOptions = Object.keys(defaultCreationParamsValue).map(x => ({
  label: locale.common.creationParams[x],
  value: x,
}));
