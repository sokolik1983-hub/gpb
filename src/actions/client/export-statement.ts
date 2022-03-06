import { fatalHandler } from 'utils';
import { singleAction, to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import { showFile } from '@platform/services';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Клиент: Функция экспорта файла выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675637
 */
export const exportStatement: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal }, { showLoader, hideLoader, service }) => async ([doc]: [IBaseEntity]) => {
    showLoader();

    const [res, err] = await to(service.exportStatement(doc.id));

    hideLoader();

    fatal(res?.error);
    fatal(err);

    const { content, fileName, mimeType } = res!;

    showFile(content, fileName, mimeType);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
