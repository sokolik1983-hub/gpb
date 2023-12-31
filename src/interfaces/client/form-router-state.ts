import type { CREATION_TYPE } from '../common/classificators/creation-type';

/**
 * Стейт роутера, при открытии формы.
 * Когда форма открывается на копирование существующей выписки,
 * то имеет отличное поведение от создания новой выписки.
 * Эти нюансы разрешаются путём передачи стейта роутера.
 * (У такого решения есть минус, что ссылки работают несогласованно).
 */
export interface IFormRouterState {
  /** Способы создания документа. */
  creationType?: CREATION_TYPE;
}
