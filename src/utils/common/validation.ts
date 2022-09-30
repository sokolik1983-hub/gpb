import type { IDateRangeFields } from 'interfaces/form/date-range-fields';
import { locale } from 'localization';
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
 * Проверяет валидность диапазона дат в схеме валидации:
 * - чтобы дата начала периода была меньше или равна дате окончания
 * - чтобы дата окончания периода была больше или равна дате начала.
 *
 * @param dateRangeFields - Объект с полями диапазона дат.
 * @returns Function.
 */
export const isValidDateRangeForSchema = (dateRangeFields: IDateRangeFields): TestFunction<string | undefined> =>
  /**
   * Тест функция yup.test.
   *
   * @param value - Текущее значение поля формы.
   * @param context - Контекст валидации функции.
   * @param context.path - Ключ проверяемого поля даты.
   * @param context.parent - Объект с текущими значениями формы.
   * @returns Boolean.
   */
  (value, { path, parent }) => {
    if (!value) {
      return true;
    }

    let valid;

    switch (path) {
      case dateRangeFields.dateFrom: {
        const dateTo = parent?.[dateRangeFields.dateTo];

        valid = dateTo ? dateTime(value).isSameOrBefore(dateTime(dateTo), 'day') : true;
        break;
      }
      case dateRangeFields.dateTo: {
        const dateFrom = parent?.[dateRangeFields.dateFrom];

        valid = dateFrom ? dateTime(value).isSameOrAfter(dateTime(dateFrom), 'day') : true;
        break;
      }
      default:
        valid = true;
    }

    return valid;
  };

/**
 * Проверяет валидность диапазона дат.
 *
 * @param range - Объект с диапазоном дат.
 * @param range.dateFrom - Дата начала периода.
 * @param range.dateTo - Дата окончания периода.
 * @returns Boolean.
 */
export const isValidDateRange = ({ dateFrom, dateTo }) =>
  dateFrom && dateTo ? dateTime(dateFrom).isSameOrBefore(dateTime(dateTo), 'day') : true;
