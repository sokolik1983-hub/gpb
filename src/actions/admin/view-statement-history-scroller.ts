import type { context } from 'actions/admin';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import type { IActionConfig } from '@platform/services';

/**
 * [Выписки_ЗВ] ЭФ Банка "Журнал запросов выписки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32247657
 * */
export const viewStatementHistoryScroller: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => () => {
    router.push(ADMIN_STREAM_URL.STATEMENT_HISTORY);

    done();

    return Promise.resolve();
  },
};
