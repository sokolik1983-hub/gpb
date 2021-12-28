import type { IFormRouterState, IStatementHistoryRow } from 'interfaces/client';
import { CREATION_TYPE } from 'interfaces/client/classificators/creation-type';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { singleAction } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * Повторный запрос выписки. [Выписки_ЗВ] Клиент: Функция запроса выписки.
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675639}
 */
export const repeatStatement: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => async ([data]: [IStatementHistoryRow]) => {
    const routerState: IFormRouterState = { creationType: CREATION_TYPE.COPY };

    router.push(`${COMMON_STREAM_URL.STATEMENT}/${data.id}`, routerState);

    done();

    return Promise.resolve();
  },
  guardians: [singleAction],
};
