import type { StatementHistoryRow } from 'interfaces/admin';
import { asyncNoop, fatalHandler } from 'utils/common';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * Экшн экспорта выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69875454
 * */
export const exportStatement: IActionConfig<typeof context, unknown> = {
  action: ({ done }) => (statement: StatementHistoryRow) => {
    console.log(statement);

    done();

    return asyncNoop();
  },
  fatalHandler,
  guardians: [],
};
