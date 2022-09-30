import type { IDateRangeFields } from 'interfaces/form/date-range-fields';
import { locale } from 'localization';
import { isLessThanTomorrow, isValidDateRangeForSchema } from 'utils/common/validation';
import { object, string } from 'yup';
import type { SchemaOf } from 'yup';

/**
 * Схема валидации полей диапазона дат.
 */
export const getDateRangeValidationScheme = ({ dateFrom, dateTo }: IDateRangeFields): SchemaOf<Record<string, string | undefined>> =>
  object({
    [dateFrom]: string()
      .test('lessThanTomorrow', locale.errors.periodStart.tomorrowRestriction, isLessThanTomorrow)
      .test('moreThanPeriodEnd', locale.errors.periodStart.dateMoreRestriction, isValidDateRangeForSchema({ dateFrom, dateTo })),
    [dateTo]: string()
      .test('lessThanTomorrow', locale.errors.periodEnd.tomorrowRestriction, isLessThanTomorrow)
      .test('lessThanPeriodStart', locale.errors.periodEnd.dateLessRestriction, isValidDateRangeForSchema({ dateFrom, dateTo })),
  });
