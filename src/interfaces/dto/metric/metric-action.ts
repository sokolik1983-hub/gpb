/** Типы действий, по которым снимается метрика. */
export enum METRIC_ACTION {
  /** Скачать отчет с выпиской или его конкретный документ. */
  DOWNLOAD_ATTACHMENT = 'DOWNLOAD_ATTACHMENT',
  /** Получить страницу истории запросов. */
  STATEMENT_REQUEST_GET_PAGE = 'STATEMENT_REQUEST_GET_PAGE',
  /** Получить страницу с проводками выписки. */
  ACCOUNTING_ENTRY_GET_PAGE = 'ACCOUNTING_ENTRY_GET_PAGE',
  /** Отправить запрос на создание выписки. */
  STATEMENT_REQUEST = 'STATEMENT_REQUEST',
  /** Отправить скрытый запрос на создание выписки. */
  HIDDEN_VIEW_STATEMENT_REQUEST = 'HIDDEN_VIEW_STATEMENT_REQUEST',
}
