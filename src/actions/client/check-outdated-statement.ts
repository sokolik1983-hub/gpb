import { showOutdatedStatementDialog } from 'components/client/export-params-dialog';
import { STATEMENT_RELEVANCE_STATUS } from 'interfaces';
import type { ACTION } from 'interfaces/common';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { fatalHandler } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import type { context } from './executor';

/** Функция проверки актуальности выписки. */
export const checkOutdatedStatement: IActionConfig<typeof context, boolean> = {
  action: ({ done, fatal, addSucceeded }, { service, showLoader, hideLoader }) => async ([doc]: [IBaseEntity], action: ACTION) => {
    if (window.location.pathname !== COMMON_STREAM_URL.STATEMENT_HISTORY) {
      // если выполняем проверку не из скроллера истории, то идем дальше
      addSucceeded(false);
      done();

      return;
    }

    showLoader();

    const [res, err] = await to(service.getStatementRelevanceStatus(doc.id));

    hideLoader();

    fatal(res?.error);
    fatal(err);

    if (res?.data.status === STATEMENT_RELEVANCE_STATUS.ACTUAL) {
      // если выписка актуальна, то идем дальше
      addSucceeded(false);
      done();

      return;
    }

    const [_, cancel] = await to(showOutdatedStatementDialog(action));

    // если закрыли модалку (cancel = true), то дальше не идем
    addSucceeded(cancel);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
