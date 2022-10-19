import type { IAccountOption } from 'components/common/accounts-field/account-option';
import type { Account, Organization, ServiceBranch, User } from 'interfaces/admin';
import { getFullName } from 'utils/common';
import { formatAccountCode } from '@platform/tools/localization';
import type { IOption } from '@platform/ui';
import type { OrganizationOptionProps } from './organization-option';

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

/**
 * Возвращает опцию выбора организации.
 *
 * @param organization - Организация.
 * @param organization.fullName - Полное наименование.
 * @param organization.id - Идентификатор.
 * @param organization.innKio - ИНН.
 * @param organization.shortName - Короткое наименование.
 */
export const getOrganizationOption = ({ fullName, id, innKio, shortName }: Organization): OrganizationOptionProps => ({
  inn: innKio,
  label: shortName || fullName,
  value: id,
});

/**
 * Возвращает опцию выбора подразделения обслуживания.
 *
 * @param serviceBranch - Подразделение обслуживания.
 * @param serviceBranch.filialName - Название филиала.
 * @param serviceBranch.id - Идентификатор.
 */
export const getServiceBranchOption = ({ filialName, id }: ServiceBranch): IOption => ({
  label: filialName,
  value: id,
});

/**
 * Возвращает опцию выбора пользователя.
 *
 * @param user - Пользователь.
 * @param user.familyName - Фамилия.
 * @param user.firstName - Имя.
 * @param user.id - Идентификатор.
 * @param user.middleName - Отчество.
 */
export const getUserOption = ({ familyName, firstName, id, middleName }: User): IOption => ({
  label: getFullName([familyName, firstName, middleName]),
  value: id,
});

/**
 * Добавляет двоеточие после значения.
 *
 * @param value - Входящая строка.
 */
export const addColon = (value: string): string => `${value}:`;

/**
 * Возвращает уникальные значения массива по переданному полю.
 *
 * @param values - Входящий массив значений.
 * @param prop - Поле, по которому произойдет фильрация на уникальность.
 */
export const uniqBy = <T>(values: T[], prop: keyof T): T[] => {
  const set = new Set();

  values.forEach(item => set.add(item[prop]));

  return Array.from(set).map(item => values.find(value => value[prop] === item) as T);
};
