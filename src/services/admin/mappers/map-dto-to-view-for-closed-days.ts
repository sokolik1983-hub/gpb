import type { ClosedDayResponseDto, ClosedDayRow } from 'interfaces/admin';
import { getDateAndTime } from 'services/admin/mappers/utils';
import { DATE_FORMAT } from '@platform/services/admin';
import { formatDateTime } from '@platform/tools/date-time';

/**
 * Мап dto в представление закрытых дней.
 *
 * @param closedDays - Список закрытых дней.
 */
export const mapDtoToViewForClosedDays = (closedDays: ClosedDayResponseDto[]): ClosedDayRow[] =>
  closedDays.map(item => ({
    ...item,
    operationDate: formatDateTime(item.operationDate, { keepLocalTime: true, format: DATE_FORMAT }),
    secondPhase: { ...item.secondPhase, ...getDateAndTime(item.secondPhase.date) },
    thirdPhase: { ...item.thirdPhase, ...getDateAndTime(item.thirdPhase.date) },
  }));
