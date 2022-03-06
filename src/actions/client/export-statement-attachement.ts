import { rowHistoryExportGuardian } from 'actions/guardians/row-history-export-guardian';
import { showStatementParamsDialog } from 'components/export-params-dialog';
import type { FORMAT } from 'interfaces/client';
import { ACTION, EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { convertToAttachmentRequest, fatalHandler, getUserDeviceInfo } from 'utils';
import { hideExportParamsDialogCases } from 'utils/export-params-dialog';
import { to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import { showFile } from '@platform/services/client';
import type { context } from './executor';

/** Вернуть набор гардов для экспорта выписки. */
const getGuardians = (useCase: EXPORT_PARAMS_USE_CASES) => {
  if (useCase === EXPORT_PARAMS_USE_CASES.FOURTEEN) {
    return [rowHistoryExportGuardian];
  }

  return [];
};

/**
 * [Выписки_ЗВ] Клиент: Функция экспорта файла выписки или документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675637
 */
export const getExportStatementAttachment = (useCase: EXPORT_PARAMS_USE_CASES): IActionConfig<typeof context, unknown> => ({
  action: ({ done, fatal, addSucceeded }, { showLoader, hideLoader, service }) => async (
    docs: IBaseEntity[],
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

      dto = convertToAttachmentRequest(docs, statementId, ACTION.DOWNLOAD, useCase, userDeviceInfo, statementFormat, formState!);
    }

    showLoader();

    const [res, err] = await to(service.createAttachment(dto));

    hideLoader();

    fatal(res?.error);
    fatal(err);

    const { content, mimeType, fileName } = res!;

    showFile(content, fileName, mimeType);

    addSucceeded(res);

    done();
  },
  guardians: getGuardians(useCase),
  fatalHandler,
});
