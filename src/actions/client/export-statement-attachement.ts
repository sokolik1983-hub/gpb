import { checkOutdatedStatement } from 'actions/client/check-outdated-statement';
import { getCreateAttachment } from 'actions/client/create-attachement';
import { exportStatement } from 'actions/client/export-statement';
import { rowHistoryExportGuardian } from 'actions/guardians/row-history-export-guardian';
import type { ICreateAttachmentResponse } from 'interfaces';
import type { IStatementHistoryRow } from 'interfaces/client';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import type { TRANSACTION_ATTACHMENT_TYPES } from 'interfaces/common';
import { ACTION } from 'interfaces/common';
import { fatalHandler } from 'utils/common';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import { showFile } from '@platform/services/client';
import type { context } from './executor';

/** Вернуть набор гардов для экспорта выписки. */
const getGuardians = (useCase: EXPORT_PARAMS_USE_CASES) => (useCase === EXPORT_PARAMS_USE_CASES.FOURTEEN ? [rowHistoryExportGuardian] : []);

/**
 * [Выписки_ЗВ] Клиент: Функция экспорта файла выписки или документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675637
 */
export const getExportStatementAttachment = (
  useCase: EXPORT_PARAMS_USE_CASES
): IActionConfig<typeof context, ICreateAttachmentResponse> => ({
  action: ({ done, fatal, addSucceeded, addFailed, execute }, { showLoader, hideLoader }) => async (
    docs: IBaseEntity[],
    statementId?: string,
    documentType?: TRANSACTION_ATTACHMENT_TYPES
  ) => {
    if (useCase === EXPORT_PARAMS_USE_CASES.FOURTEEN) {
      const [doc] = docs as IStatementHistoryRow[];

      showLoader();

      const {
        succeeded: [isOutdated],
      } = await execute(checkOutdatedStatement, [doc], ACTION.DOWNLOAD);

      if (isOutdated) {
        hideLoader();
        done();

        return;
      }

      const {
        succeeded: [data],
        failed: [error],
      } = await execute(exportStatement, [doc]);

      fatal(error);

      if (!data) {
        hideLoader();
        addFailed();
        done();

        return;
      }

      hideLoader();

      addSucceeded();

      done();

      return;
    }

    const createAttachment = getCreateAttachment(useCase, ACTION.DOWNLOAD, documentType);

    const {
      succeeded: [data],
      failed: [error],
    } = await execute(createAttachment, docs, statementId);

    fatal(error);

    if (!data) {
      hideLoader();
      addFailed();
      done();

      return;
    }

    const { content, mimeType, fileName } = data;

    showFile(content, fileName, mimeType);

    hideLoader();

    addSucceeded();

    done();
  },
  guardians: getGuardians(useCase),
  fatalHandler,
});
