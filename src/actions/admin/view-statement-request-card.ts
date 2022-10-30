import type { context } from 'actions/admin';
import type { StatementHistoryRow } from 'interfaces/admin';
import { generatePath } from 'react-router-dom';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import { singleAction } from '@platform/core';
import type { IActionConfig } from '@platform/services';

/**
 * [Выписки_ЗВ] Банк: Функция просмотра карточки запроса выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32247826
 * */
export const viewStatementRequestCard: IActionConfig<typeof context, unknown> = {
  action: ({ done }, { router }) => ({ id }: StatementHistoryRow) => {
    router.push(generatePath(ADMIN_STREAM_URL.STATEMENT_REQUEST, { id }));

    done();

    return Promise.resolve();
  },
  guardians: [singleAction],
};
