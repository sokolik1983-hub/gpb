import { checkOutdatedStatement } from 'actions/client/check-outdated-statement';
import type { ACTION } from 'interfaces/client';
import type { ICreateRequestStatementDto } from 'interfaces/dto';
import { fatalHandler } from 'utils';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';
import { gotoTransactionsScroller } from './goto-transactions-scroller';

/** Действие перехода на скроллер проводок, по сущности "Запрос выписки". */
export const gotoTransactionsScrollerByStatementRequest: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal, execute }, { service, showLoader, hideLoader }) => async (
    [doc]: [ICreateRequestStatementDto],
    action: ACTION
  ) => {
    const {
      succeeded: [isOutdated],
    } = await execute(checkOutdatedStatement, [doc], action);

    if (isOutdated) {
      done();

      return;
    }

    showLoader();

    const [res, err] = await to(service.getStatementByStatementRequestId(doc.id));

    hideLoader();

    fatal(res?.error);
    fatal(err);

    await execute(gotoTransactionsScroller, [res?.data]);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
