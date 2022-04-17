import { printBase64 } from 'platform-copies/utils';
import { fatalHandler } from 'utils';
import { singleAction, to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
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

    const { content, mimeType, fileName } = res!;

    await printBase64(content, fileName, mimeType);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
