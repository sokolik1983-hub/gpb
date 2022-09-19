import type { context } from 'actions/admin';
import type { StatementRequest } from 'interfaces/admin';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import type { IActionConfig } from '@platform/services';

/** Показать форму просмотра запроса на выписку. */
export const showStatementRequestForm: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => ({ id, refererPage }: StatementRequest) => {
    router.push(`${ADMIN_STREAM_URL.STATEMENT}/${id}`, { refererPage });

    done();

    return Promise.resolve();
  },
};
