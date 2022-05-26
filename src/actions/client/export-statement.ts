import type { ILatestStatementDto } from 'interfaces/dto';
import { checkEmptyStatement, fatalHandler } from 'utils';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import { showFile } from '@platform/services';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Клиент: Функция экспорта файла выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675637
 */
export const exportStatement: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal }, { showLoader, hideLoader, service }) => async ([doc]: [ILatestStatementDto]) => {
    showLoader();

    const [res, err] = await to(service.exportStatement(doc.id));

    hideLoader();

    fatal(res?.error);
    fatal(err);

    if (checkEmptyStatement(doc, res!)) {
      done();

      return;
    }

    const { content, fileName, mimeType } = res!;

    showFile(content, fileName, mimeType);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
