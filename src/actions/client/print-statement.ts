import { showStatementParamsDialog } from 'components/export-params-dialog';
import type { EXPORT_PARAMS_USE_CASES } from 'components/export-params-dialog/statemet-params-use-cases';
import type { IStatementHistoryRow } from 'interfaces/client';
import type { ICreateRequestStatementDto } from 'interfaces/client/create-request-statement-dto';
import { fatalHandler } from 'utils';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Клиент: Функция печати документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440703
 */
export const getPrintStatement = (useCase: EXPORT_PARAMS_USE_CASES): IActionConfig<typeof context, ICreateRequestStatementDto> => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action: ({ done }) => async ([data]: IStatementHistoryRow[]) => {
    const [_, close] = await to(showStatementParamsDialog(useCase));

    if (close) {
      done();
    }

    done();
  },
  fatalHandler,
  guardians: [singleAction],
});
