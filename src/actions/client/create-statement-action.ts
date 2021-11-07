import { noopAction } from 'actions/common';
import type { ICreateStatementDto } from 'interfaces/client';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Клиент: Функция запроса выписки.
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=34448340}
 */
export const createStatementAction: IActionConfig<typeof context, ICreateStatementDto> = {
  // TODO: Сделать реализацию действия.
  ...noopAction,
  guardians: [],
};
