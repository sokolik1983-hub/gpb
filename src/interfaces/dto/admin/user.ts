/** Фильтр по пользователю. */
interface UserByFilter {
  /** Вхождение подстроки поиска. */
  contains: string;
}

/** Дто запроса пользователя. */
export type UserRequestDto = Record<string, UserByFilter>;
