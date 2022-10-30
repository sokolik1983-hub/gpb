import type { ClientUserDto, User } from 'interfaces/admin';

/**
 * Мап dto в представление пользователя.
 *
 * @param users - Список пользователей.
 */
export const mapDtoToViewForUserList = (users: ClientUserDto[]): User[] =>
  users.map(({ familyName, firstName, id, middleName, uaaUser }) => ({ familyName, firstName, id, middleName, uaaId: uaaUser.id }));
