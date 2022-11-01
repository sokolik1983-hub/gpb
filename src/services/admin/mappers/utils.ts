import { DATE_TIME_FORMAT_WITHOUT_SEC } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';

/**
 * Получить дату и время из полной даты.
 *
 * @param fullDate - Полная дата.
 */
export const getDateAndTime = (fullDate: string): { date: string; time: string } => {
  const [date, time] = formatDateTime(fullDate, {
    keepLocalTime: true,
    format: DATE_TIME_FORMAT_WITHOUT_SEC,
  }).split(' ');

  return { date, time };
};
