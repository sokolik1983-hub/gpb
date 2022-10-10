import type { StatementHistoryRow } from 'interfaces/admin';
import { asyncNoop, fatalHandler } from 'utils/common';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/** Экшн просмотра измененных проводок. */
export const viewModifiedTransactions: IActionConfig<typeof context, unknown> = {
  action: ({ done }) => (statement: StatementHistoryRow) => {
    console.log(statement);

    done();

    return asyncNoop();
  },
  fatalHandler,
  guardians: [],
};
