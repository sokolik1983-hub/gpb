import { OUTDATED_STATEMENT_MODE } from 'interfaces/client';
import { fatalHandler } from 'utils';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { IBaseEntity } from '@platform/services/client';
import type { context } from './executor';
import { gotoTransactionsScroller } from './goto-transactions-scroller';
import { isContinueActionWithStatement } from './utils';

/** Действие перехода на скроллер проводок, по сущности "Запрос выписки". */
export const gotoTransactionsScrollerByStatementRequest: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal, execute }, { service, showLoader, hideLoader }) => async ([doc]: [IBaseEntity]) => {
    showLoader();

    const [resultStatus, errorStatus] = await to(service.getStatementRelevanceStatus(doc.id));

    hideLoader();

    fatal(resultStatus?.error);
    fatal(errorStatus);

    const isContinueAction = await isContinueActionWithStatement(resultStatus!.data.status, OUTDATED_STATEMENT_MODE.VIEW);

    if (isContinueAction) {
      showLoader();

      const [resultRequest, errorRequest] = await to(service.getStatementByStatementRequestId(doc.id));

      hideLoader();

      fatal(resultRequest?.error);
      fatal(errorRequest);

      await execute(gotoTransactionsScroller, [resultRequest?.data]);
    }

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
