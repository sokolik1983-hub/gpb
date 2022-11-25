import { DATE_PERIODS } from 'interfaces';
import type { IGetDatePeriodRequestDto, IGetDatePeriodResponseDto } from 'interfaces/dto';
import { dateTime } from '@platform/tools/date-time';

const getLastQuarter = function (): IGetDatePeriodResponseDto {
  const format = 'YYYY-MM-DD';
  const month = dateTime().month();

  if (month <= 2) {
    return {
      dateFrom: dateTime().subtract(1, 'year').month(9).date(1).format(format),
      dateTo: dateTime().subtract(1, 'year').month(11).date(31).format(format),
    };
  } else if (month <= 5) {
    return {
      dateFrom: dateTime().month(0).date(1).format(format),
      dateTo: dateTime().month(2).date(31).format(format),
    };
  } else if (month <= 8) {
    return {
      dateFrom: dateTime().month(3).date(1).format(format),
      dateTo: dateTime().month(5).date(30).format(format),
    };
  }

  return {
    dateFrom: dateTime().month(6).date(1).format(format),
    dateTo: dateTime().month(8).date(30).format(format),
  };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getDatePeriod = async function ({ periodType }: IGetDatePeriodRequestDto): Promise<IGetDatePeriodResponseDto> {
  const format = 'YYYY-MM-DD';

  switch (periodType) {
    case DATE_PERIODS.TODAY:
      return { dateFrom: dateTime().format(format), dateTo: dateTime().format(format) };
    case DATE_PERIODS.YESTERDAY:
      return { dateFrom: dateTime().subtract(1, 'day').format(format), dateTo: dateTime().subtract(1, 'day').format(format) };
    case DATE_PERIODS.LAST_3_DAYS:
      return { dateFrom: dateTime().subtract(3, 'day').format(format), dateTo: dateTime().format(format) };
    case DATE_PERIODS.CURRENT_MONTH:
      return { dateFrom: dateTime().date(1).format(format), dateTo: dateTime().format(format) };
    case DATE_PERIODS.LAST_MONTH:
      return {
        dateFrom: dateTime().subtract(1, 'month').date(1).format(format),
        dateTo: dateTime().date(1).subtract(1, 'day').format(format),
      };
    case DATE_PERIODS.PREVIOUS_QUARTER:
      return getLastQuarter();
    default:
      return { dateFrom: '', dateTo: '' };
  }
};
