import { locale } from 'localization';
import { FORM_FIELDS } from 'stream-constants/form';
import type { TestFunction } from 'yup/lib/util/createValidation';
import { dateTime } from '@platform/tools/date-time';

/**
 * Возвращает сообщение об ошибке для обязательного поля/реквизита.
 *
 * @param fieldName - Имя реквизита.
 * @returns - Сообщение об ошибке.
 */
export const getEmptyFieldErrorMessage = (fieldName: string) => locale.errors.emptyField({ fieldName });

/**
 * Проверяет чтобы дата была не больше сегодняшнего дня.
 * Если вернёт true - то дата меньше завтрашнего дня.
 * Если параметр не передан или пустая строка, то не выполняет проверку.
 *
 * @param value - Дата для проверки.
 */
export const isLessThanTomorrow = (value: string | undefined): boolean => {
  if (!value) {
    return true;
  }

  return dateTime(value).isSameOrBefore(dateTime(), 'day');
};

/**
 * Проверяет валидность диапазона дат:
 * - чтобы дата начала периода была меньше или равна дате окончания
 * - чтобы дата окончания периода была больше или равна дате начала.
 *
 * @param value - Дата для проверки.
 * @param context - Контекст валидации функции.
 * @param context.path - Ключ проверяемого поля даты.
 * @param context.parent - Объект с текущими значениями формы.
 */
export const isValidDateRange: TestFunction<string | undefined> = (value, { path, parent }) => {
  if (!value) {
    return true;
  }

  let valid;

  switch (path) {
    case FORM_FIELDS.DATE_FROM: {
      const dateTo = parent?.[FORM_FIELDS.DATE_TO];

      valid = dateTo ? dateTime(value).isSameOrBefore(dateTime(dateTo), 'day') : true;
      break;
    }
    case FORM_FIELDS.DATE_TO: {
      const dateFrom = parent?.[FORM_FIELDS.DATE_FROM];

      valid = dateFrom ? dateTime(value).isSameOrAfter(dateTime(dateFrom), 'day') : true;
      break;
    }
    default:
      valid = true;
  }

  return valid;
};
