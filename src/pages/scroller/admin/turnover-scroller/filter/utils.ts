import type { IAccountOption } from 'components/common/accounts-field/account-option';
import type { Account, Organization } from 'interfaces/admin';
import { formatAccountCode } from '@platform/tools/localization';

/**
 * Возвращает опцию для организации.
 *
 * @param organization Данные организации.
 * @param organization.id Id организации.
 * @param organization.innKio ИНН организации.
 * @param organization.fullName Полное имя организации.
 * @param organization.shortName Краткое имя организации.
 */
export const getOrganizationOption = ({ fullName, id, innKio, shortName }: Organization) => ({
  inn: innKio,
  label: shortName || fullName,
  value: id,
});

/**
 * Возвращает опцию для счета.
 *
 * @param account Счет.
 * @param account.accountNumber Номер счета.
 * @param account.bankClient Данные организации.
 */
export const getAccountOption = ({ accountNumber, bankClient }: Account): IAccountOption => ({
  accountNumber,
  label: formatAccountCode(accountNumber),
  orgName: bankClient?.shortName || bankClient?.fullName,
  value: accountNumber,
});
