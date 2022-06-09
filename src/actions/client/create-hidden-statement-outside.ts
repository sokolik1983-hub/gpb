import { createStatement } from 'actions/client/create-statement';
import { DATE_PERIODS } from 'interfaces';
import { ACTION, CREATION_TYPE, OPERATIONS, TYPE } from 'interfaces/client';
import type { ICreateRequestStatementDto } from 'interfaces/dto';
import { fatalHandler } from 'utils';
import { singleAction } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/** Функция скрытого запроса выписки. */
export const createStatementHiddenOutside: IActionConfig<typeof context, string> = {
  action: ({ done, fatal, addSucceeded, execute }) => async ({ accountId, refererPage }: { accountId: string; refererPage: string }) => {
    const doc: Partial<ICreateRequestStatementDto> = {
      action: ACTION.VIEW,
      type: TYPE.HIDDEN_VIEW,
      creationType: CREATION_TYPE.NEW,
      sourcePage: refererPage,
      accountsIds: [accountId],
      dateFrom: '2022-06-08',
      dateTo: '2022-06-08',
      periodType: DATE_PERIODS.SELECT_PERIOD,
      operations: OPERATIONS.ALL,
      creationParams: {
        includeCreditOrders: false,
        includeCreditStatements: false,
        includeDebitOrders: false,
        includeDebitStatements: false,
        separateDocumentsFiles: false,
      },
      hideEmptyTurnovers: false,
      separateAccountsFiles: false,
      sign: false,
    };

    const {
      succeeded: [data],
      failed: [error],
    } = await execute(createStatement, [doc]);

    fatal(error);

    addSucceeded(data);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
