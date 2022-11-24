import type { context } from 'actions/admin';
import type { StatementRequest } from 'interfaces/admin';
import { generatePath } from 'react-router-dom';
import { NEW_ENTITY_ID } from 'stream-constants';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import type { IActionConfig } from '@platform/services';

/**
 * Показать форму просмотра запроса выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69873403
 * */
export const showStatementRequestForm: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done }, { router }) => ({ refererPage }: StatementRequest) => {
    router.push(generatePath(ADMIN_STREAM_URL.STATEMENT_REQUEST, { id: NEW_ENTITY_ID }), { refererPage });

    done();

    return Promise.resolve();
  },
};
