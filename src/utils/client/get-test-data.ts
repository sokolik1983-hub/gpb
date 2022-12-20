import type { IStatementScheduleRow } from 'interfaces/client';
import { DATE_TIME_FORMAT_WITHOUT_SEC } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';

/** Параметры входящих данных в функцию getTestData. */
interface IGetTestData {
  data: IStatementScheduleRow[];
}

/** Временная функция для доставки тестовых данных. */
export const getTestData = (data: IGetTestData) =>
  data.data.map(item => ({
    ...item,
    createdAt: formatDateTime(item.createdAt, {
      // форматируем дату для отображения в таблице
      keepLocalTime: true,
      format: DATE_TIME_FORMAT_WITHOUT_SEC,
    }).split(' ')[0],
    accountNumbers: item.accountNumbers.map(el => formatAccountCode(el)), // форматируем номера аккаунтов
  }));
