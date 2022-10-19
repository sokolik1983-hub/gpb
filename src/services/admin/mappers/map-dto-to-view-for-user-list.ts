import type { User } from 'interfaces/admin';

/**
 * Мап dto в представление пользователя.
 *
 * @param users - Список пользователей.
 */
export const mapDtoToViewForUserList = (users: User[]): User[] =>
  users.map(({ familyName, firstName, id, middleName }) => ({ familyName, firstName, id, middleName }));
