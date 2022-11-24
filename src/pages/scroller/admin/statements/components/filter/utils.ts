import type { Branch, User } from 'interfaces/admin';
import { getFullName } from 'utils/common';
import type { IOption } from '@platform/ui';

/**
 * Возвращает опцию выбора подразделения обслуживания.
 *
 * @param serviceBranch - Подразделение обслуживания.
 * @param serviceBranch.filialName - Название филиала.
 * @param serviceBranch.id - Идентификатор.
 */
export const getServiceBranchOption = ({ filialName, id }: Branch): IOption => ({
  label: filialName,
  value: id,
});

/**
 * Возвращает опцию выбора пользователя.
 *
 * @param user - Пользователь.
 * @param user.familyName - Фамилия.
 * @param user.firstName - Имя.
 * @param user.uaaId - UAA идентификатор пользователя.
 * @param user.middleName - Отчество.
 */
export const getUserOption = ({ familyName, firstName, middleName, uaaId }: User): IOption => ({
  label: getFullName([familyName, firstName, middleName]),
  value: uaaId,
});

/**
 * Добавляет двоеточие после значения.
 *
 * @param value - Входящая строка.
 */
export const addColon = (value: string): string => `${value}:`;
