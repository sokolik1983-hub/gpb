import type { context } from 'actions/admin';
import type { RequestTransactions } from 'interfaces/admin';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import type { IActionConfig } from '@platform/services';

/** Показать журнал проводок из запроса. */
export const showTransactionsScroller: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => ({ id, refererPage }: RequestTransactions) => {
    router.push(`${ADMIN_STREAM_URL.TRANSACTION_REQUESTS}/${id}`, { refererPage });

    done();

    return Promise.resolve();
  },
};
