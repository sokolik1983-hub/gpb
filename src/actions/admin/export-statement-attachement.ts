import type { ICreateAttachmentResponse } from 'interfaces';
import { asyncNoop, fatalHandler } from 'utils/common';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/** Вернуть набор гардов для экспорта выписки. */
const getGuardians = () => [];

/**
 * [Выписки_ЗВ] Банк: Функция экспорта файла выписки или документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69874143
 */
export const getExportStatementAttachment = (): IActionConfig<typeof context, ICreateAttachmentResponse> => ({
  action: ({ done }) => () => {
    done();

    return asyncNoop();
  },
  guardians: getGuardians(),
  fatalHandler,
});
