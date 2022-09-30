import type { IFormRouterState } from 'interfaces/client';
import { CREATION_TYPE } from 'interfaces/common/classificators/creation-type';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { fatalHandler } from 'utils/common';
import { singleAction } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import type { context } from './executor';

/**
 * Повторный запрос выписки. [Выписки_ЗВ] Клиент: Функция запроса выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675639
 */
export const repeatStatement: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => async ([doc]: [IBaseEntity]) => {
    const routerState: IFormRouterState = { creationType: CREATION_TYPE.COPY };

    router.push(`${COMMON_STREAM_URL.STATEMENT}/${doc.id}`, routerState);

    done();

    return Promise.resolve();
  },
  fatalHandler,
  guardians: [singleAction],
};
