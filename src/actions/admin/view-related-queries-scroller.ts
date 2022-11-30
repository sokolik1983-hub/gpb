import type { context } from 'actions/admin';
import type { StatementHistoryRow } from 'interfaces/admin';
import { generatePath } from 'react-router-dom';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import { singleAction } from '@platform/core';
import type { IActionConfig } from '@platform/services';

/**
 * [Выписки_ЗВ] Банк: Функция просмотра связанных запросов.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=80646561
 * */
export const viewRelatedQueriesScroller: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => ({ statementId }: StatementHistoryRow) => {
    router.push(generatePath(ADMIN_STREAM_URL.RELATED_QUERIES, { id: statementId }));

    done();

    return Promise.resolve();
  },
  guardians: [singleAction],
};
