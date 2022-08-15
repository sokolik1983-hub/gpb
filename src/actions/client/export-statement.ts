import type { ILatestStatementDto } from 'interfaces/dto';
import { checkEmptyStatement, fatalHandler } from 'utils';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import { attachmentService, errorHandler, showFile } from '@platform/services/client';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Клиент: Функция экспорта файла выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675637
 */
export const exportStatement: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal }, { showLoader, hideLoader, service }) => async ([doc]: [ILatestStatementDto]) => {
    showLoader();

    const [data, err] = await to(service.exportStatement(doc.id));

    hideLoader();

    fatal(data?.error);
    fatal(err);

    const { fileId, token } = data;

    attachmentService
      .download(fileId, token)
      .then(file => {
        if (checkEmptyStatement(doc, file.data, true)) {
          return;
        }

        showFile(file.data, file.fileName, file.type);
      })
      .catch(errorHandler());

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
