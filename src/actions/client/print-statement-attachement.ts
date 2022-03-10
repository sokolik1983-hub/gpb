import { getCreateAttachment } from 'actions/client/create-attachement';
import type { ICreateAttachmentResponse } from 'interfaces';
import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { ACTION } from 'interfaces/client';
import { fatalHandler } from 'utils';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import { mimeTypeToExt, printBase64 } from '@platform/services/client';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Клиент: Функция печати документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440703
 */
export const getPrintStatementAttachment = (
  useCase: EXPORT_PARAMS_USE_CASES
): IActionConfig<typeof context, ICreateAttachmentResponse> => ({
  action: ({ done, fatal, addSucceeded, execute }) => async (docs: IBaseEntity[], statementId?: string) => {
    const createAttachment = getCreateAttachment(useCase, ACTION.PRINT);

    const {
      succeeded: [data],
      failed: [error],
    } = await execute(createAttachment, docs, statementId);

    fatal(error);

    if (!data) {
      done();

      return;
    }

    const { content, mimeType } = data;

    printBase64(content, mimeTypeToExt(mimeType));

    addSucceeded();

    done();
  },
  fatalHandler,
});
