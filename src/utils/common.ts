import { dateTime } from '@platform/tools/date-time';

/** Типизированная noop-функция. */
export const noop = <T = unknown>() => (({} as unknown) as T);

/** Асинхронная noop-функция. */
export const asyncNoop = <T = unknown>() => Promise.resolve(noop<T>());

/** Возвращает дату вчерашнего дня. */
export const getYesterday = () => dateTime().subtract(1, 'day');

/**
 * Используется в предикате для Array.sort, для сортировки строк по возрастанию.
 *
 * @param a - Строка для сравнения.
 * @param b - Строка для сравнения.
 */
export const compareStrings = (a: string, b: string): -1 | 0 | 1 => {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
};
