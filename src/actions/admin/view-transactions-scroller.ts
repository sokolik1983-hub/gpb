import type { context } from 'actions/admin';
import type { StatementHistoryRow } from 'interfaces/admin';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import { singleAction } from '@platform/core';
import type { IActionConfig } from '@platform/services';

/**
 * [Выписки_ЗВ] Банк: Функция просмотра журнала проводок из запроса.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440002
 * */
export const viewTransactionsScroller: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => ({ statementId }: StatementHistoryRow) => {
    router.push(`${ADMIN_STREAM_URL.TRANSACTION_REQUESTS}/${statementId}`);

    done();

    return Promise.resolve();
  },
  guardians: [singleAction],
};
