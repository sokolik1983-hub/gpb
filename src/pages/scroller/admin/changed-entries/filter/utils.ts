import type { IAccountOption } from 'components/common/accounts-field/account-option';
import type { Counterparty } from 'interfaces/admin';
import type { BankClient } from 'interfaces/common';
import { parseCounterparty } from 'utils/common';
import { formatAccountCode } from '@platform/tools/localization';

export const bankClientFieldFormatter = (value: unknown): Array<{ inn: string; name: string }> => {
  // Присвоение делается для улучшения типизации т.к. параметр функции не удаётся типизировать.
  const selectedCounterparties = value as string[];

  return selectedCounterparties.map(item => parseCounterparty(item));
};

/**
 * Возвращает опцию выбора счета.
 *
 * @param client - Клиент.
 * @param client.accountNumber - Номер счета.
 * @param client.name - Наименование клиента.
 */
export const getAccountOption = ({ accountNumber, name }: BankClient | Counterparty): IAccountOption => ({
  accountNumber,
  label: formatAccountCode(accountNumber),
  orgName: name,
  value: accountNumber,
});
