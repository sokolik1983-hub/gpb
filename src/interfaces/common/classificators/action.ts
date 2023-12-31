/**
 * Допустимое действие над выпиской.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28677623
 **/
export enum ACTION {
  /** Экспорт. */
  DOWNLOAD = 'DOWNLOAD',
  /** Отправка на электронную почту. */
  SEND_TO_EMAIL = 'SEND_TO_EMAIL',
  /** Печать. */
  PRINT = 'PRINT',
  /** Просмотр. */
  VIEW = 'VIEW',
}
