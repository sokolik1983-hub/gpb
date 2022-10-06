/** Данные имени пользователя. */
type UserName = [string, string, string?];

/** Метод получения полного имени пользователя. */
export const getFullName = ([familyName, firstName, middleName]: UserName): string =>
  middleName ? `${familyName} ${firstName} ${middleName}` : `${familyName} ${firstName}`;
