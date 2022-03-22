import { fatalHandler, printBase64 } from 'utils';
import { singleAction, to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import { mimeTypeToExt } from '@platform/services/client';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Клиент: Функция экспорта файла выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675637
 */
export const printStatement: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal }, { showLoader, hideLoader, service }) => async ([doc]: [IBaseEntity]) => {
    showLoader();

    const [res, err] = await to(service.printStatement(doc.id));

    hideLoader();

    fatal(res?.error);
    fatal(err);

    const { content, mimeType } = res!;

    printBase64(content, mimeTypeToExt(mimeType));

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
