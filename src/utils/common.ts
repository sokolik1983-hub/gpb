import { dateTime } from '@platform/tools/date-time';

/** Типизированная noop-функция. */
export const noop = <T = unknown>() => (({} as unknown) as T);

/** Асинхронная noop-функция. */
export const asyncNoop = <T = unknown>() => Promise.resolve(noop<T>());

/** Возвращает дату вчерашнего дня. */
export const getYesterday = () => dateTime().subtract(1, 'day');
