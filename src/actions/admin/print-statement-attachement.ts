import { getCreateAttachment } from 'actions/admin/create-attachement';
import type { ICreateAttachmentResponse } from 'interfaces';
import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/admin';
import type { TRANSACTION_ATTACHMENT_TYPES } from 'interfaces/common';
import { ACTION } from 'interfaces/common';
import { printBase64 } from 'platform-copies/utils';
import { fatalHandler } from 'utils/common';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Банк: Функция печати документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69874143
 */
export const getPrintStatementAttachment = (
  useCase: EXPORT_PARAMS_USE_CASES
): IActionConfig<typeof context, ICreateAttachmentResponse> => ({
  action: ({ done, fatal, addSucceeded, execute }) => async (
    docs: IBaseEntity[],
    statementId?: string,
    documentType?: TRANSACTION_ATTACHMENT_TYPES
  ) => {
    const createAttachment = getCreateAttachment(useCase, ACTION.PRINT, documentType);

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

    await printBase64(content, fileName, mimeType);

    addSucceeded();

    done();
  },
  fatalHandler,
});
