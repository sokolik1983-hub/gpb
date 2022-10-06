import type { USER_TYPE } from 'interfaces/admin/user-type';

/** Пользователь. */
export interface USER {
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
