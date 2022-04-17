import type { IAccountTurnoversInfo, IGroupInfo, IGroupedAccounts } from 'interfaces/dto';

/**
 * Определяет является ли параметр блоком со сгруппированными счетами.
 *
 * @param groupedAccounts - Данные для проверки.
 */
export const isGroupedAccounts = (groupedAccounts: IAccountTurnoversInfo | IGroupedAccounts): groupedAccounts is IGroupedAccounts => {
  const groupInfoKey: keyof IGroupedAccounts = 'groupInfo';

  return groupInfoKey in groupedAccounts;
};

/**
 * Определяет, является ли параметр, данными группирующей строки.
 *
 * @param row - Строка для проверки.
 */
export const isGroupingRow = (row: IAccountTurnoversInfo | IGroupInfo): row is IGroupInfo => {
  const key: keyof IGroupInfo = 'groupingType';

  return key in row;
};
