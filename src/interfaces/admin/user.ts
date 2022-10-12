import type { USER_TYPE } from 'interfaces/admin/user-type';

/** Свойства пользователя выписки. */
export interface StatementUser {
  /** Фамилия. */
  familyName: string;
  /** Имя. */
  firstName: string;
  /** Идентификатор. */
  id: string;
  /** Отчество. */
  middleName: string;
  /** Тип пользователя. */
  type: USER_TYPE;
}

/** Свойства пользователя. */
export interface User {
  /** Фамилия. */
  familyName: string;
  /** Имя. */
  firstName: string;
  /** Идентификатор. */
  id: string;
  /** Отчество. */
  middleName: string;
}
