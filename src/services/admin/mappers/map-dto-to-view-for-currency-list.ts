import type { Currency } from 'interfaces/admin';

/**
 * Мап dto в представление валют.
 *
 * @param currencies - Список валют.
 */
export const mapDtoToViewForCurrencyList = (currencies: Currency[]): Currency[] => currencies.map(({ code, id }) => ({ code, id }));
