import type { context } from 'actions/admin';
import type { RequestTransactions } from 'interfaces/admin';
import { generatePath } from 'react-router-dom';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import type { IActionConfig } from '@platform/services';

/**
 * Показать журнал проводок из запроса.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440002
 * */
export const showTransactionsScroller: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => ({ id, refererPage }: RequestTransactions) => {
    router.push(generatePath(ADMIN_STREAM_URL.STATEMENT_REQUEST, { id }), { refererPage });

    done();

    return Promise.resolve();
  },
};
