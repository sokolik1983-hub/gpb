import { getStatementFile } from 'actions/admin/get-statement-file';
import type { ICreateAttachmentResponse } from 'interfaces';
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
export const printStatement: IActionConfig<typeof context, ICreateAttachmentResponse> = {
  action: ({ done, fatal, addSucceeded, execute }) => async (
    docs: IBaseEntity[],
    statementId: string,
    hideDialog: boolean,
    documentType?: TRANSACTION_ATTACHMENT_TYPES
  ) => {
    const createAttachment = getStatementFile(ACTION.PRINT, hideDialog, documentType);

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
};
