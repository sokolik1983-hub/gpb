import type { Account } from 'interfaces/admin';

/**
 * Мап dto в представление счета.
 *
 * @param accounts - Список счетов.
 */
export const mapDtoToViewForAccountList = (accounts: Account[]): Account[] =>
  accounts.map(({ accountNumber, bankClient, id }) => ({ accountNumber, bankClient, id }));
