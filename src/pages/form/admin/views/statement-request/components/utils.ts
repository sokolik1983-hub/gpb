import type { Account, AccountType, Branch } from 'interfaces/admin';
import type { AccountOptionProps } from 'pages/form/admin/views/statement-request/components/account-option';
import type { BranchOptionProps } from 'pages/form/admin/views/statement-request/components/branch-option';
import type { IOption } from '@platform/ui';

/**
 * Возвращает опцию выбора счета.
 *
 * @param account - Счет.
 * @param account.accountNumber - Номер счета.
 * @param account.accountType - Тип счета.
 * @param account.bankClient - Информация об организации.
 * @param account.branch - Подразделение обслуживания.
 * @param account.id - Идентификатор.
 */
export const getAccountOption = ({ accountNumber, accountType, bankClient, branch, id }: Account): AccountOptionProps => ({
  label: accountNumber,
  value: {
    accountNumber,
    accountTypeCode: accountType.code,
    bankClientId: bankClient.id,
    bankClientName: bankClient?.shortName || bankClient?.fullName,
    branchId: branch.id,
    id,
  },
});

/**
 * Возвращает опцию выбора подразделения обслуживания.
 *
 * @param serviceBranch - Подразделение обслуживания.
 * @param serviceBranch.absNumber - Код филиала в РКО Ф1.
 * @param serviceBranch.filialName - Название филиала.
 * @param serviceBranch.id - Идентификатор.
 */
export const getServiceBranchOption = ({ absNumber, filialName, id }: Branch): BranchOptionProps => ({
  absNumber,
  label: filialName,
  value: id,
});

/**
 * Возвращает опцию выбора типа счета.
 *
 * @param accountType - Тип счета.
 * @param accountType.code - Код типа счета.
 * @param accountType.description - Краткое наименование.
 */
export const getAccountTypeOption = ({ code, description }: AccountType): IOption => ({
  label: description,
  value: code,
});
