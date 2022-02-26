/** Привилегии клиентской части сервиса.  */
export enum PRIVILEGE {
  /**
   * [Выписки_ЗВ] Клиент: Функция просмотра журнала проводок.
   *
   * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675664
   */
  ACCOUNTING_ENTRY_VIEW = 'ACCOUNTING_ENTRY_VIEW',

  /**
   * Привилегии на скачивание/печати вложения для выписки.
   *
   * [Выписки_ЗВ] Клиент: Функция печати документа.
   *
   * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440703
   *
   * [Выписки_ЗВ] Клиент: Функция печати файла выписки или документа.
   * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440682
   *
   * [Выписки_ЗВ] Клиент: Функция экспорта файла выписки или документа
   * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675637
   */
  ATTACHMENT_DOWNLOAD = 'ATTACHMENT_DOWNLOAD',

  /**
   * [Выписки_ЗВ] Клиент: Функция просмотра карточки проводки.
   *
   * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675633
   */
  ACCOUNTING_ENTRY_CARD_VIEW = 'ACCOUNTING_ENTRY_CARD_VIEW',

  /**
   * [Выписки_ЗВ] Клиент: Функция запроса выписки.
   *
   * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675639
   *
   * Повторный запрос выписки. [Выписки_ЗВ] Клиент: Функция запроса выписки.
   *
   * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675639
   *
   * [Выписки_ЗВ] Клиент: Функция отображения факта отправки выписки.
   *
   * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34441546
   */
  STATEMENT_REQUEST = 'STATEMENT_REQUEST',

  /**
   * [Выписки_ЗВ] Клиент: Функция просмотра ОСВ.
   *
   * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675631
   */
  TURNOVER_SUMMARY_VIEW = 'TURNOVER_SUMMARY_VIEW',
}
