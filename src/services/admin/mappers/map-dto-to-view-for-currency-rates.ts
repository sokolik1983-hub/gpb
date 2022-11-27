import type { CurrencyRateDto, CurrencyRateRow } from 'interfaces/admin';
import { DATE_FORMAT } from '@platform/services/admin';
import { formatDateTime } from '@platform/tools/date-time';

/**
 * Мап dto в представление курсов валют.
 *
 * @param currencyRates - Список курсов валют.
 */
export const mapDtoToViewForCurrencyRates = (currencyRates: CurrencyRateDto[]): CurrencyRateRow[] =>
  currencyRates.map(({ rateDate, rateValue, ...rest }) => ({
    ...rest,
    rateDate: formatDateTime(rateDate, { keepLocalTime: true, format: DATE_FORMAT }),
    rateValue: String(rateValue).replace(/\./, ','),
  }));
