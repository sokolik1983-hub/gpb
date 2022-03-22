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
