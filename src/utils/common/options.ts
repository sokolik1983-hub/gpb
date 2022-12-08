import type { Account } from 'interfaces/admin';
import type { IAccountOption } from 'pages/form/client/components/accounts-field/account-option';
import { formatAccountCode } from '@platform/tools/localization';

/**
 * Возвращает опцию выбора счета.
 *
 * @param account - Счет.
 * @param account.accountNumber - Номер счета.
 * @param account.bankClient - Информация об организации.
 */
export const getAccountOption = ({ accountNumber, bankClient }: Account): IAccountOption => ({
  accountNumber,
  label: formatAccountCode(accountNumber),
  orgName: bankClient?.shortName || bankClient?.fullName,
  value: accountNumber,
});
