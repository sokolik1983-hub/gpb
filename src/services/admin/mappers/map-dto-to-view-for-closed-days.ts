import type { ClosedDayResponseDto, ClosedDayRow } from 'interfaces/admin';
import { getDateAndTime } from 'services/admin/mappers/utils';
import { DATE_FORMAT } from '@platform/services/admin';
import { formatDateTime } from '@platform/tools/date-time';
import { guid } from '@platform/tools/istore';

/**
 * Мап dto в представление закрытых дней.
 *
 * @param closedDays - Список закрытых дней.
 */
export const mapDtoToViewForClosedDays = (closedDays: ClosedDayResponseDto[]): ClosedDayRow[] =>
  closedDays.map(
    ({
      branchCode,
      branchName,
      operationDate,
      secondPhaseClosingTime,
      secondPhaseMessageId,
      thirdPhaseClosingTime,
      thirdPhaseMessageId,
    }) => {
      let entry: ClosedDayRow = {
        branch: {
          code: branchCode,
          name: branchName,
        },
        id: guid(),
        operationDate: formatDateTime(operationDate, { keepLocalTime: true, format: DATE_FORMAT }),
      };

      if (secondPhaseMessageId && secondPhaseClosingTime) {
        entry = { ...entry, secondPhase: { ...getDateAndTime(secondPhaseClosingTime), messageId: secondPhaseMessageId } };
      }

      if (thirdPhaseMessageId && thirdPhaseClosingTime) {
        entry = { ...entry, thirdPhase: { ...getDateAndTime(thirdPhaseClosingTime), messageId: thirdPhaseMessageId } };
      }

      return entry;
    }
  );
