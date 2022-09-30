import { checkOutdatedStatement } from 'actions/client/check-outdated-statement';
import type { ACTION } from 'interfaces/common';
import type { ICreateRequestStatementDto } from 'interfaces/dto';
import type { ENTRY_SOURCE_VIEW } from 'stream-constants';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { fatalHandler } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/** Действие перехода на скроллер проводок, по сущности "Запрос выписки". */
export const gotoTransactionsScrollerByStatementRequest: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal, execute }, { service, showLoader, hideLoader, router }) => async (
    [doc]: [ICreateRequestStatementDto],
    action: ACTION,
    entrySourceView?: typeof ENTRY_SOURCE_VIEW
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

    if (res) {
      router.push(`${COMMON_STREAM_URL.STATEMENT_TRANSACTIONS}/${res.data.id}`, { entrySourceView });
    }

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
