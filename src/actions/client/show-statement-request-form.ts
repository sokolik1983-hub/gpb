import type { context } from 'actions/client/executor';
import type { ExternalStatementRequest } from 'interfaces/form';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import type { IActionConfig } from '@platform/services';

/** Показать ЭФ создания запроса на выписку. */
export const showStatementRequestForm: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => async ({ formValues, refererPage }: ExternalStatementRequest) => {
    router.push(`${COMMON_STREAM_URL.STATEMENT}/new`, { formValues, refererPage });

    done();

    return Promise.resolve();
  },
};
