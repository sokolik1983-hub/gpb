import type { ILatestStatementDto } from 'interfaces/dto';
import { getPublicDownloadUrl } from 'utils/client';
import { fatalHandler } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
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

    window.open(getPublicDownloadUrl(data.token));
    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
