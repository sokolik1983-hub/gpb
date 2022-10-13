import type { context } from 'actions/admin';
import type { StatementRequest } from 'interfaces/admin';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import type { IActionConfig } from '@platform/services';

/** Показать журнал запросов выписки. */
export const showStatementRequestScroller: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => async ({ refererPage }: StatementRequest) => {
    router.push(`${ADMIN_STREAM_URL.STATEMENT_HISTORY}`, { refererPage });

    done();

    return Promise.resolve();
  },
};
