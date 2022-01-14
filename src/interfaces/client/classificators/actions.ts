/**
 * Допустимые действия над выпиской.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28677623
 **/
export enum ACTIONS {
  /** Скачивание. */
  DOWNLOAD = 'DOWNLOAD',
  /** Отправка на электронную почту. */
  SEND_TO_EMAIL = 'SEND_TO_EMAIL',
  /** Печать. */
  PRINT = 'PRINT',
  /** Просмотр. */
  VIEW = 'VIEW',
}
