import type { context } from 'actions/admin';
import type { RequestTransactions } from 'interfaces/admin';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import type { IActionConfig } from '@platform/services';

/**
 * Показать журнал проводок из запроса.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440002
 * */
export const showTransactionsScroller: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => ({ id, refererPage }: RequestTransactions) => {
    router.push(`${ADMIN_STREAM_URL.STATEMENT}/${id}`, { refererPage });

    done();

    return Promise.resolve();
  },
};
