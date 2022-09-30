import type { ILatestStatementDto } from 'interfaces/dto';
import { checkEmptyStatement, fatalHandler, showEmptyStatementWarning } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import { attachmentService, ERROR, errorHandler, showFile } from '@platform/services/client';
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
      .catch(e => {
        // потенциально может сработать только при экспорте и только для ИФТ или ПРОМ из-за особенностей ФС
        const { status } = e.response;

        if (status === ERROR.UNEXPECTED_SYSTEM_ERROR) {
          showEmptyStatementWarning(doc);

          return;
        }

        errorHandler();
      })
      .finally(() => {
        done();
      });
  },
  fatalHandler,
  guardians: [singleAction],
};
