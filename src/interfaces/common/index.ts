import { ERROR } from '@platform/services';

export * from './classificators';

/** Распарсеные параметры УРЛа. */
export interface IUrlParams {
  /** Идентификатор сущности. */
  id: string;
}

/** Коды ответа HTTP.  */
export const HTTP_STATUS_CODE = {
  ...ERROR,
  /** Запрос успешно обработан. */
  OK: 200,
};