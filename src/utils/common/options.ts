import type { IAccountOption } from 'components/common/accounts-field/account-option';
import type { Account } from 'interfaces/admin';
import { formatAccountCode } from '@platform/tools/localization';

/**
 * Возвращает опцию выбора счета.
 *
 * @param account - Счет.
 * @param account.accountNumber - Номер счета.
 * @param account.bankClient - Информация об организации.
 * @param account.id - Идентификатор.
 */
export const getAccountOption = ({ accountNumber, bankClient, id }: Account): IAccountOption => ({
  accountNumber,
  label: formatAccountCode(accountNumber),
  orgName: bankClient?.shortName || bankClient?.fullName,
  value: id,
});
