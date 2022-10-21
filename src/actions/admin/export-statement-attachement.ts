import { getCreateAttachment } from 'actions/admin/create-attachement';
import type { ICreateAttachmentResponse, TRANSACTION_ATTACHMENT_TYPES } from 'interfaces';
import { ACTION } from 'interfaces';
import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/admin';
import { fatalHandler } from 'utils/common';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import { showFile } from '@platform/services/admin';
import type { context } from './executor';

/** Вернуть набор гардов для экспорта выписки. */
const getGuardians = () => [];

/**
 * [Выписки_ЗВ] Банк: Функция экспорта файла выписки или документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69874143
 */
export const getExportStatementAttachment = (
  useCase: EXPORT_PARAMS_USE_CASES
): IActionConfig<typeof context, ICreateAttachmentResponse> => ({
  action: ({ done, fatal, addSucceeded, addFailed, execute }, { hideLoader }) => async (
    docs: IBaseEntity[],
    statementId?: string,
    documentType?: TRANSACTION_ATTACHMENT_TYPES
  ) => {
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
  guardians: getGuardians(),
  fatalHandler,
});
