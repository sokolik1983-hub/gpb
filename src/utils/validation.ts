import { locale } from 'localization';
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
