export enum DATA_ACTION {
  SING = 'sign', // подписать
  SIGN_AND_SEND = 'signAndSend', // подписать и отправить
  SEND = 'send', // отправить
  SAVE = 'save', // сохранить
  SAVE_TEMPLATE = 'saveTemplate', // сохранить шаблон
  COPY = 'copy', // копировать
  APPLY_TEMPLATE = 'applyTemplate', // заполнить из шаблона
  REMOVE = 'remove', // удалить
  RECALL = 'recall', // отозвать
  EXPORT = 'export', // экспорт
  PRINT = 'print', // печать
  UNSIGN = 'unsign', // снять подпись
  SIGN_VERIFY = 'signVerify', // проверить подпись
  VIEW_HISTORY = 'viewHistory', // история изменений
  ACCEPT = 'accept', // акцептовать
  REFUSE = 'refuse', // отказать в акцепте
  MORE = 'more', // ещё
  REPEAT_REQUEST = 'repeat-request', // Повторный запрос
  VIEW = 'view', // Просмотреть
  VIEW_SCHEDULE = 'view', // Просмотреть печатную форму выписки по расписанию
  CANCEL = 'cancel', // Отключить услугу
}
