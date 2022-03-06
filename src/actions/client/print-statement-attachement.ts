import { showStatementParamsDialog } from 'components/export-params-dialog';
import type { EXPORT_PARAMS_USE_CASES, IStatementHistoryRow, IStatementTransactionRow, FORMAT } from 'interfaces/client';
import { ACTION } from 'interfaces/client';
import { convertToAttachmentRequest, fatalHandler, getUserDeviceInfo } from 'utils';
import { hideExportParamsDialogCases } from 'utils/export-params-dialog';
import { to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import { mimeTypeToExt, printBase64 } from '@platform/services/client';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Клиент: Функция печати документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440703
 */
export const getPrintStatementAttachment = (useCase: EXPORT_PARAMS_USE_CASES): IActionConfig<typeof context, unknown> => ({
  action: ({ done, fatal, addSucceeded }, { showLoader, hideLoader, service }) => async (
    docs: IStatementHistoryRow[] | IStatementTransactionRow[],
    statementId: string,
    statementFormat?: FORMAT
  ) => {
    let dto;

    if (hideExportParamsDialogCases.includes(useCase)) {
      const userDeviceInfo = await getUserDeviceInfo();

      dto = convertToAttachmentRequest(docs, statementId, ACTION.DOWNLOAD, useCase, userDeviceInfo, statementFormat);
    } else {
      const [formState, close] = await to(showStatementParamsDialog(useCase));

      if (close) {
        done();

        return;
      }

      const userDeviceInfo = await getUserDeviceInfo();

      dto = convertToAttachmentRequest(docs, statementId, ACTION.PRINT, useCase, userDeviceInfo, statementFormat, formState!);
    }

    showLoader();

    const [res, err] = await to(service.createAttachment(dto));

    hideLoader();

    fatal(res?.error);
    fatal(err);

    const { content, mimeType } = res!;

    printBase64(content, mimeTypeToExt(mimeType));

    addSucceeded(res);

    done();
  },
  fatalHandler,
});
