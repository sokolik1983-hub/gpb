import { ACTION } from 'interfaces';
import { printBase64 } from 'platform-copies/utils';
import { fatalHandler } from 'utils/common';
import { to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import { showFile } from '@platform/services/admin';
import type { context } from './executor';

/**
 * Банк: Функция формирования документа выписки/основания.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=80643158
 * */
export const getExportEntries = (action: ACTION.DOWNLOAD | ACTION.PRINT): IActionConfig<typeof context, unknown> => ({
  action: ({ done, fatal }, { hideLoader, service, showLoader }) => async (docs: IBaseEntity[]) => {
    showLoader();

    const entriesIds = docs.map(doc => doc.id);

    const [file, error] = await to(
      service.exportEntries({
        entriesIds,
      })
    );

    if (error || !file || file.content.length === 0) {
      hideLoader();

      fatal('ERROR');

      return;
    }

    hideLoader();

    switch (action) {
      case ACTION.DOWNLOAD:
        showFile(file.content, file.fileName, file.mimeType);
        break;
      case ACTION.PRINT:
        await printBase64(file.content, file.fileName, file.mimeType);
        break;
      default:
        break;
    }

    done();
  },
  fatalHandler,
  guardians: [],
});
