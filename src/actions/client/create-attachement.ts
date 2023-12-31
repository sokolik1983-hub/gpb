import { showStatementParamsDialog } from 'components/client/export-params-dialog';
import type { IStatementHistoryRow } from 'interfaces/client';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { ACTION, FORMAT, TRANSACTION_ATTACHMENT_TYPES } from 'interfaces/common';
import type { IGetTransactionCardResponseDto, ICreateAttachmentRequestDto } from 'interfaces/dto';
import { locale } from 'localization';
import {
  alwaysSentParamsCasesWithoutUI,
  convertToCreationParams,
  convertToExtendedCreationParams,
  fileFormatShowCases,
  hideExportParamsDialogCases,
} from 'utils/client';
import { fatalHandler, getUserDeviceInfo } from 'utils/common';
import { to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import { DATE_FORMAT, getAppConfigItem } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { dialog } from '@platform/ui';
import { createAttachmentAsync } from './create-attachment-async';
import type { context } from './executor';

/** Вспомогательная функция формирования файла выписки или документа. */
export const getCreateAttachment = (
  useCase: EXPORT_PARAMS_USE_CASES,
  action: ACTION,
  documentType?: TRANSACTION_ATTACHMENT_TYPES
): IActionConfig<typeof context, unknown> => ({
  action: ({ done, fatal, addSucceeded, execute, addFailed }, { showLoader, hideLoader, service }) => async (
    docs: IBaseEntity[],
    statementId?: string
  ) => {
    const isGenerateStatement = [EXPORT_PARAMS_USE_CASES.ONE, EXPORT_PARAMS_USE_CASES.TWO, EXPORT_PARAMS_USE_CASES.FOURTEEN].includes(
      useCase
    );
    const params: Omit<ICreateAttachmentRequestDto, 'userDeviceInfo'> = {
      action,
      format: FORMAT.PDF,
      genStatement: isGenerateStatement,
      statementId: '',
      accountingEntriesIds: isGenerateStatement ? [] : docs.map(x => Number(x.id)),
    };
    let otherParams: Partial<ICreateAttachmentRequestDto> = {};

    const isShowDialog = !hideExportParamsDialogCases.includes(useCase);

    if (useCase === EXPORT_PARAMS_USE_CASES.FOURTEEN) {
      const [doc] = docs as IStatementHistoryRow[];

      showLoader();

      const [resp, error] = await to(service.getStatementByStatementRequestId(doc.id));

      hideLoader();

      fatal(resp?.error);
      fatal(error);

      params.statementId = resp!.data.id;

      if (action !== ACTION.PRINT) {
        params.format = doc.statementFormat!;
      }
    } else {
      params.statementId = statementId!;
    }

    if (isShowDialog) {
      const [response, close] = await to(showStatementParamsDialog(useCase, action, statementId));

      if (close) {
        done();

        return;
      }

      const { formState, statementInfo } = response!;

      if (fileFormatShowCases.includes(useCase)) {
        params.format = formState.format;
      }

      const baseParams = convertToCreationParams(formState, useCase, documentType);
      const { sign, ...extendedParams } = convertToExtendedCreationParams(formState);

      otherParams = { ...baseParams, ...extendedParams, signed: sign };

      if (otherParams.hideEmptyTurnovers && statementInfo.income === 0 && statementInfo.outcome === 0) {
        dialog.showAlert(
          locale.form.notFoundStatement.warning({
            dateFrom: formatDateTime(formState.dateFrom, { keepLocalTime: true, format: DATE_FORMAT }),
            dateTo: formatDateTime(formState.dateTo, { keepLocalTime: true, format: DATE_FORMAT }),
          })
        );

        done();

        return;
      }
    } else if (alwaysSentParamsCasesWithoutUI.includes(useCase)) {
      let generateOrders;
      let generateStatements;

      // но формируем вложение с раздела приложений карточки проводки
      if ([EXPORT_PARAMS_USE_CASES.TWELVE, EXPORT_PARAMS_USE_CASES.THIRTEEN].includes(useCase)) {
        generateOrders = documentType === TRANSACTION_ATTACHMENT_TYPES.BASE;
        generateStatements = documentType === TRANSACTION_ATTACHMENT_TYPES.STATEMENT;
      } else {
        // в противном случае принудительно отправляем признак формирования выписок
        generateStatements = true;

        const [doc] = docs as IGetTransactionCardResponseDto[];

        generateOrders = Boolean(doc.appendixDto?.documents?.find(x => x.documentTypeDto === TRANSACTION_ATTACHMENT_TYPES.STATEMENT));
      }

      otherParams = {
        includeCreditOrders: generateOrders,
        includeCreditStatements: generateStatements,
        includeDebitOrders: generateOrders,
        includeDebitStatements: generateStatements,
      };
    }

    showLoader();

    const userDeviceInfo = await getUserDeviceInfo();

    const dto: ICreateAttachmentRequestDto = { ...params, ...otherParams, userDeviceInfo };

    if (getAppConfigItem('createAttach.old')) {
      const [resp, err] = await to(service.createAttachment(dto));

      fatal(resp?.error);
      fatal(err);

      hideLoader();
      addSucceeded(resp);
      done();
    } else {
      const {
        succeeded: [data],
        failed: [error],
      } = await execute(createAttachmentAsync, dto, action);

      fatal(error);

      if (!data) {
        hideLoader();
        addFailed();
        done();

        return;
      }

      hideLoader();
      addSucceeded(data);
      done();
    }
  },
  guardians: [],
  fatalHandler,
});
