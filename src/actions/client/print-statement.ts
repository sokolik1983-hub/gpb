import type { ILatestStatementDto } from 'interfaces/dto';
import { locale } from 'localization';
import { printBase64 } from 'platform-copies/utils';
import { checkEmptyStatement } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig, IBaseContext } from '@platform/services';
import type { context } from './executor';

/** Обработчик фатальной ошибки печати. */
const fatalHandler = ({ showError }: IBaseContext) => showError(locale.errors.progressErrorHeader, locale.errors.printStatement.content);

/**
 * [Выписки_ЗВ] Клиент: Функция экспорта файла выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675637
 */
export const printStatement: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal }, { showLoader, hideLoader, service }) => async ([doc]: [ILatestStatementDto]) => {
    showLoader();

    const [res, err] = await to(service.printStatement(doc.id));

    hideLoader();

    fatal(res?.error);
    fatal(err);

    if (checkEmptyStatement(doc, res?.content)) {
      done();

      return;
    }

    const { content, mimeType, fileName } = res!;

    await printBase64(content, fileName, mimeType);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
