import { showOutdatedStatementDialog } from 'components/export-params-dialog';
import { STATEMENT_RELEVANCE_STATUS } from 'interfaces';
import type { ACTION } from 'interfaces/client';
import { fatalHandler } from 'utils';
import { to, singleAction } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { IBaseEntity } from '@platform/services/client';
import type { context } from './executor';

/** Функция проверки актуальности выписки. */
export const checkOutdatedStatement: IActionConfig<typeof context, void> = {
  action: ({ done, fatal, addSucceeded }, { service, showLoader, hideLoader }) => async ([doc]: [IBaseEntity], action: ACTION) => {
    showLoader();

    const [res, err] = await to(service.getStatementRelevanceStatus(doc.id));

    hideLoader();

    fatal(res?.error);
    fatal(err);

    if (res?.data.status === STATEMENT_RELEVANCE_STATUS.ACTUAL) {
      done();

      return;
    }

    const [_, cancel] = await to(showOutdatedStatementDialog(action));

    if (cancel) {
      done();

      return;
    }

    addSucceeded();

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
