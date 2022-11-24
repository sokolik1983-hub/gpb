import { ACTION } from 'interfaces';
import type { ICreateAttachmentRequestDto, StatementAttachmentStatusDto } from 'interfaces/dto';
import { STATEMENT_ATTACHMENT_STATUS } from 'interfaces/dto';
import { getPublicDownloadUrl } from 'utils/client';
import { fatalHandler } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig, IServerResp } from '@platform/services';
import { callStreamAction, getAppConfigItem } from '@platform/services';
import { attachmentService, ERROR, errorHandler, polling } from '@platform/services/client';
import type { context } from './executor';

/** Вспомогательная функция асинхронного формирования файла выписки или документа. */
export const createAttachmentAsync: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal, addSucceeded }, { showLoader, hideLoader, service }) => async (
    dto: ICreateAttachmentRequestDto,
    action: ACTION
  ) => {
    showLoader();

    const [createResp, createErr] = await to(service.createAttachmentAsync.createAttachment(dto));

    fatal(createErr);

    const job = polling<IServerResp<StatementAttachmentStatusDto>, [string]>(
      service.createAttachmentAsync.getStatus,
      (res: IServerResp<StatementAttachmentStatusDto>) =>
        [STATEMENT_ATTACHMENT_STATUS.ERROR, STATEMENT_ATTACHMENT_STATUS.EXECUTE].includes(res?.data.status),
      getAppConfigItem('createAttach.interval') ?? 3 * 1000,
      getAppConfigItem('createAttach.maxCount') ?? 30
    );

    const [pollData, pollError] = await to(job(createResp!.data));

    fatal(pollError);

    if (pollData?.data.status === STATEMENT_ATTACHMENT_STATUS.ERROR) {
      fatal('ERROR');

      return;
    }

    hideLoader();

    const [tokenAndFileId, tokenAndFileIdError] = await to(service.createAttachmentAsync.generateTokenAndFileId(createResp!.data));

    fatal(tokenAndFileIdError);

    const { fileId, token } = tokenAndFileId!.data;

    if (action === ACTION.DOWNLOAD) {
      window.open(getPublicDownloadUrl(token));
      done();
    }

    attachmentService
      .download(fileId, token)
      .then(file => {
        if (!file.data) {
          fatal('ERROR');

          return;
        }

        void callStreamAction('pdf-preview', 'previewFile', {
          data: file.data,
          fileName: file.fileName,
          type: 'application/pdf',
        });

        addSucceeded();
      })
      .catch(e => {
        // потенциально может сработать только при экспорте и только для ИФТ или ПРОМ из-за особенностей ФС
        const { status } = e.response;

        if (status === ERROR.UNEXPECTED_SYSTEM_ERROR) {
          fatal('ERROR');

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
