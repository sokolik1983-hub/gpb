import type { ICreateAttachmentResponse } from 'interfaces';
import { asyncNoop, fatalHandler } from 'utils/common';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Банк: Функция печати документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69874143
 */
export const getPrintStatementAttachment = (): IActionConfig<typeof context, ICreateAttachmentResponse> => ({
  action: ({ done }) => () => {
    done();

    return asyncNoop();
  },
  fatalHandler,
});
