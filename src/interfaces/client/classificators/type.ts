/**
 * Тип запроса выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440654
 */
export enum TYPE {
  /** Разовый запрос. */
  ONETIME = 'ONETIME',
  /** Регулярный запрос. */
  REGULAR = 'REGULAR',
  /** Скрытый запрос просмотра. */
  HIDDEN_VIEW = 'HIDDEN_VIEW',
  /** Скрытый запрос экспорта. */
  HIDDEN_EXPORT = 'HIDDEN_EXPORT',
  /** Скрытый запрос печати. */
  HIDDEN_PRINT = 'HIDDEN_PRINT',
  /** HIDDEN_PRINT_EXPORT_OSV. */
  HIDDEN_PRINT_EXPORT_OSV = 'HIDDEN_PRINT_EXPORT_OSV',
}
