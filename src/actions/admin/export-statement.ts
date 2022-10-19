import type { CreateStatementAttachmentRequestDto, StatementHistoryRow } from 'interfaces/admin';
import { fatalHandler, getUserDeviceInfo } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import { showFile } from '@platform/services/client';
import type { context } from './executor';

/**
 * Функция печати/экспорта документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69875454
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69874143
 * */
export const exportStatement: IActionConfig<typeof context, unknown> = {
  action: ({ done, fatal }, { hideLoader, service, showLoader }) => async (statement: StatementHistoryRow) => {
    showLoader();

    const userDeviceInfo = await getUserDeviceInfo();

    const { action, format, statementId } = statement;

    const data: CreateStatementAttachmentRequestDto = {
      action,
      format,
      statementId,
      userDeviceInfo,
    };

    const [file, error] = await to(service.createStatementAttachment(data));

    if (error || !file || (file?.content && ((file?.content as unknown) as ArrayBuffer).byteLength === 0)) {
      hideLoader();

      fatal('error');

      return;
    }

    hideLoader();

    showFile(file.content, file.fileName, file.mimeType);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
