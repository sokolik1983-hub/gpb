import type { Currency } from 'interfaces/admin';
import type { IOption } from '@platform/ui';

/**
 * Возвращает опцию выбора кода валюты.
 *
 * @param currency - Валюта.
 * @param currency.code - Буквенный код валюты.
 */
export const getCurrencyCodeOption = ({ code }: Currency): IOption => ({
  label: code,
  value: code,
});
