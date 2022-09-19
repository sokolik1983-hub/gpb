import type { context } from 'actions/admin';
import type { StatementRequest } from 'interfaces/admin';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import type { IActionConfig } from '@platform/services';

/** Показать ЭФ создания запроса на выписку. */
export const showStatementRequestForm: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => async ({ id, refererPage }: StatementRequest) => {
    router.push(`${ADMIN_STREAM_URL.STATEMENT}/${id}`, { refererPage });

    done();

    return Promise.resolve();
  },
};
