import { noopAction } from 'actions/common';
import type { ICreateStatementDto } from 'interfaces/client';
import type { IActionConfig } from '@platform/services';
import type { ClientExecutorContext } from './client-action-executor';

/**
 * [Выписки_ЗВ] Клиент: Функция запроса выписки.
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=34448340}
 */
export const createStatementAction: IActionConfig<ClientExecutorContext, ICreateStatementDto> = {
  // TODO: Сделать реализацию действия.
  ...noopAction,
  guardians: [],
};
