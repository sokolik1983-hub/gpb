import type { IFileDataResponse } from 'interfaces/admin';
import { asyncNoop, fatalHandler } from 'utils/common';
import { singleAction } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * Банк: Функция экспорта файла выписки или документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69874052
 * */
export const downloadFile: IActionConfig<typeof context, unknown> = {
  action: ({ done }) => async (file: IFileDataResponse) => {
    console.log(file.fileName);
    done();

    return asyncNoop();
  },
  fatalHandler,
  guardians: [singleAction],
};
