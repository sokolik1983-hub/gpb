import { showEntriesParamsDialog } from 'components/admin/entries-params-dialog';
import { ACTION, TRANSACTION_ATTACHMENT_TYPES } from 'interfaces';
import type { AccountingEntryAttachmentRequest } from 'interfaces/admin/accounting-entry-attachment-request';
import { DETAIL_DOCUMENT_PARAMS } from 'interfaces/form';
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
export const getExportEntries = (action: ACTION.DOWNLOAD | ACTION.PRINT, hideDialog: boolean): IActionConfig<typeof context, unknown> => ({
  action: ({ done, fatal }, { hideLoader, service, showLoader }) => async (
    docs: IBaseEntity[],
    documentType?: TRANSACTION_ATTACHMENT_TYPES
  ) => {
    showLoader();

    const entriesIds = docs.map(doc => doc.id);

    const requestParams: AccountingEntryAttachmentRequest = {
      accountingEntryIds: entriesIds,
      action,
      includeCreditOrders: false,
      includeCreditStatements: false,
      includeDebitOrders: false,
      includeDebitStatements: false,
      separateDocumentsFiles: false,
    };

    if (!hideDialog) {
      const [response, close] = await to(showEntriesParamsDialog({ action, amount: entriesIds.length }));

      if (close) {
        hideLoader();
        done();

        return;
      }

      const formState = response!;

      requestParams.includeCreditOrders = formState.includes(DETAIL_DOCUMENT_PARAMS.REQUEST_BASE_DOCUMENTS);
      requestParams.includeDebitOrders = formState.includes(DETAIL_DOCUMENT_PARAMS.REQUEST_BASE_DOCUMENTS);

      requestParams.includeCreditStatements = formState.includes(DETAIL_DOCUMENT_PARAMS.REQUEST_STATEMENT_DOCUMENTS);
      requestParams.includeDebitStatements = formState.includes(DETAIL_DOCUMENT_PARAMS.REQUEST_STATEMENT_DOCUMENTS);

      requestParams.separateDocumentsFiles = formState.includes(DETAIL_DOCUMENT_PARAMS.SEPARATE_DOCUMENTS_FILES);
    } else if (documentType) {
      if (documentType === TRANSACTION_ATTACHMENT_TYPES.BASE) {
        requestParams.includeCreditOrders = true;
        requestParams.includeDebitOrders = true;
      } else {
        requestParams.includeCreditStatements = true;
        requestParams.includeDebitStatements = true;
      }
    }

    const [file, error] = await to(service.exportEntries(requestParams));

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
