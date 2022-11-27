import type { Account } from 'interfaces/admin';
import { formatAccountCode } from '@platform/tools/localization';

/**
 * Мап dto в представление счета.
 *
 * @param accounts - Список счетов.
 */
export const mapDtoToViewForAccountList = (accounts: Account[]): Account[] =>
  accounts.map(({ accountNumber, accountType, bankClient, branch, id }) => ({
    accountNumber: formatAccountCode(accountNumber),
    accountType,
    bankClient,
    branch,
    id,
  }));
