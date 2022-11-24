import { getStatementFile } from 'actions/admin/get-statement-file';
import { statementExport } from 'actions/admin/guardians';
import type { ICreateAttachmentResponse, TRANSACTION_ATTACHMENT_TYPES } from 'interfaces';
import { ACTION } from 'interfaces';
import type { CreateStatementAttachmentRequestDto, StatementHistoryRow } from 'interfaces/admin';
import { fatalHandler, getUserDeviceInfo } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import { showFile } from '@platform/services/admin';
import type { context } from './executor';

/** Вернуть набор гардов для экспорта выписки. */
const getGuardians = () => [];

/**
 * [Выписки_ЗВ] Банк: Функция экспорта файла выписки или документа.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69874143
 */
export const exportStatement: IActionConfig<typeof context, ICreateAttachmentResponse> = {
  action: ({ done, fatal, addSucceeded, addFailed, execute }, { hideLoader }) => async (
    docs: IBaseEntity[],
    statementId: string,
    hideDialog: boolean,
    documentType?: TRANSACTION_ATTACHMENT_TYPES
  ) => {
    const createAttachment = getStatementFile(ACTION.DOWNLOAD, hideDialog, documentType);

    const {
      succeeded: [data],
      failed: [error],
    } = await execute(createAttachment, docs, statementId);

    fatal(error);

    if (!data) {
      hideLoader();
      addFailed();
      done();

      return;
    }

    const { content, mimeType, fileName } = data;

    if (!content) {
      hideLoader();

      fatal('error');

      return;
    }

    showFile(content, fileName, mimeType);

    hideLoader();

    addSucceeded();

    done();
  },
  guardians: getGuardians(),
  fatalHandler,
};

/**
 * Экспорт готовой выписки из журнала выписок.
 */
export const exportExistingStatement: IActionConfig<typeof context, ICreateAttachmentResponse> = {
  action: ({ done, fatal }, { hideLoader, showLoader, service }) => async (doc: StatementHistoryRow) => {
    showLoader();

    const userDeviceInfo = await getUserDeviceInfo();

    const { action, format, statementId } = doc;

    const data: CreateStatementAttachmentRequestDto = {
      action,
      format,
      statementId,
      userDeviceInfo,
    };

    const [file, error] = await to(service.createStatementAttachment(data));

    if (error || !file || file.content.length === 0) {
      hideLoader();

      fatal('error');

      return;
    }

    hideLoader();

    showFile(file.content, file.fileName, file.mimeType);

    done();
  },
  fatalHandler,
  guardians: [singleAction, statementExport],
};
