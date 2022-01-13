import { fatalHandler } from 'utils';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { IBaseEntity } from '@platform/services/client';
import type { context } from './executor';
import { gotoTransactionsScroller } from './goto-transactions-scroller';

/** Действие перехода на скроллер проводок, по сущности "Запрос выписки". */
export const gotoTransactionsScrollerByStatementRequest: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal, execute }, { service, showLoader, hideLoader }) => async ([doc]: [IBaseEntity]) => {
    showLoader();

    const [res, err] = await to(service.getStatementByStatementRequestId(doc.id));

    hideLoader();

    const { data, error } = res ?? {};

    fatal(err || error);

    await execute(gotoTransactionsScroller, [data]);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
