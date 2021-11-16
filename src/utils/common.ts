import { dateTime } from '@platform/tools/date-time';

/** Ничего не делает. Используется для значений по умолчанию. */
export const noop = () => {};

/** Возвращает дату вчерашнего дня. */
export const getYesterday = () => dateTime().subtract(1, 'day');
