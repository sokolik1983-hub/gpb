import { checkOutdatedStatement } from 'actions/client/check-outdated-statement';
import { getCreateAttachment } from 'actions/client/create-attachement';
import { rowHistoryExportGuardian } from 'actions/guardians/row-history-export-guardian';
import type { ICreateAttachmentResponse } from 'interfaces';
import type { TRANSACTION_ATTACHMENT_TYPES } from 'interfaces/client';
import { ACTION, EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { fatalHandler } from 'utils';
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
export const getExportStatementAttachment = (
  useCase: EXPORT_PARAMS_USE_CASES
): IActionConfig<typeof context, ICreateAttachmentResponse> => ({
  action: ({ done, fatal, addSucceeded, execute }, { service, showLoader, hideLoader }) => async (
    docs: IBaseEntity[],
    statementId?: string,
    documentType?: TRANSACTION_ATTACHMENT_TYPES
  ) => {
    if (useCase === EXPORT_PARAMS_USE_CASES.FOURTEEN) {
      const [doc] = docs;

      showLoader();

      const [res, err] = await to(service.getStatementRelevanceStatus(doc.id));

      hideLoader();

      fatal(res?.error);
      fatal(err);

      const { succeeded } = await execute(checkOutdatedStatement, [doc, ACTION.DOWNLOAD]);

      if (succeeded) {
        done();

        return;
      }
    }

    const createAttachment = getCreateAttachment(useCase, ACTION.DOWNLOAD, documentType);

    const {
      succeeded: [data],
      failed: [error],
    } = await execute(createAttachment, docs, statementId);

    fatal(error);

    if (!data) {
      done();

      return;
    }

    const { content, mimeType, fileName } = data;

    showFile(content, fileName, mimeType);

    addSucceeded();

    done();
  },
  guardians: getGuardians(useCase),
  fatalHandler,
});
