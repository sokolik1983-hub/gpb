import type { StatementHistoryRow } from 'interfaces/admin';
import { asyncNoop, fatalHandler } from 'utils/common';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * Экшн экспорта реестра выписок.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69875084
 * */
export const exportRegistryStatements: IActionConfig<typeof context, unknown> = {
  action: ({ done }) => (statements: StatementHistoryRow[]) => {
    console.log(statements);

    done();

    return asyncNoop();
  },
  fatalHandler,
  guardians: [],
};
