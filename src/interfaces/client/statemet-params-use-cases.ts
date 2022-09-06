/**
 * Варианты вызова диалога "ЭФ параметров выписки и документов".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34441172
 */
export enum EXPORT_PARAMS_USE_CASES {
  /** Экспорт или отправка на почту выписки и документов (с журнала проводок). */
  ONE = 1,
  /** Печать выписки и документов (с журнала проводок). */
  TWO = 2,
  /** Экспорт или отправка на почту документов (с журнала проводок). */
  THREE = 3,
  /** Печать документов (с журнала проводок). */
  FOUR = 4,
  /** Отправка на почту документов (с журнала проводок). */
  FIVE = 5,
  /** Печать документов (с журнала проводок). */
  SIX = 6,
  /** Экспорт и отправка на почту документов (с журнала проводок). */
  SEVEN = 7,
  /** Отправка на почту документов (с журнала проводок). */
  EIGHT = 8,
  /** Печать всегда двух документов (с карточки проводки). */
  NINE = 9,
  /** Скачать всегда два документа (с карточки проводки). */
  TEN = 10,
  /** Отправка на почту всегда двух документов (с карточки проводки). */
  ELEVEN = 11,
  /** Скачать документ (с карточки проводки). */
  TWELVE = 12,
  /** Печать документа (с карточки проводки). */
  THIRTEEN = 13,
  /** Экспорт или отправка на почту документов (со скроллера истории запросов). */
  FOURTEEN = 14,
  /** Экспорт или печать документов (со скроллера оборотов). */
  FIFTEEN = 15,
  /** ЭФ создания запроса на выписку. */
  SIXTEEN = 16,
  /** Другой сервис. */
  SEVENTEEN = 17,
  /** Формирование выписки (со скроллера оборотов). */
  EIGHTEEN = 18,
}
