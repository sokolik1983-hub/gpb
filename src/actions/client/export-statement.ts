import { exportGuardian } from 'actions/guardians/export-guardian';
import { showStatementParamsDialog } from 'components/export-params-dialog';
import type { EXPORT_PARAMS_USE_CASES } from 'components/export-params-dialog/statemet-params-use-cases';
import { hideExportParamsDialogCases } from 'components/export-params-dialog/utils';
import type { IStatementHistoryRow } from 'interfaces/client';
import type { ICreateRequestStatementDto } from 'interfaces/client/create-request-statement-dto';
import { fatalHandler } from 'utils';
import { to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Клиент: Функция экспорта файла выписки или документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675637
 */
export const getExportStatement = (useCase: EXPORT_PARAMS_USE_CASES): IActionConfig<typeof context, ICreateRequestStatementDto> => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action: ({ done }) => async (docs: IStatementHistoryRow[]) => {
    if (hideExportParamsDialogCases.includes(useCase)) {
      done();

      return;
    }

    const [_, close] = await to(showStatementParamsDialog(useCase));

    if (close) {
      done();
    }

    // TODO добавить вызов экспорта по готовности BE

    done();
  },
  guardians: [exportGuardian],
  fatalHandler,
});
