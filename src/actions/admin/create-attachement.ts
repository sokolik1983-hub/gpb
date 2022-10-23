import { showStatementParamsDialog } from 'components/admin/export-params-dialog';
import type { CreateStatementAttachmentRequestDto } from 'interfaces/admin';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/admin';
import type { ACTION } from 'interfaces/common';
import { FORMAT, TRANSACTION_ATTACHMENT_TYPES } from 'interfaces/common';
import type { IGetTransactionCardResponseDto } from 'interfaces/dto';
import { locale } from 'localization';
import {
  alwaysSentParamsCasesWithoutUI,
  convertToCreationParams,
  convertToExtendedCreationParams,
  fileFormatShowCases,
  hideExportParamsDialogCases,
} from 'utils/admin';
import { fatalHandler, getUserDeviceInfo } from 'utils/common';
import { to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { dialog } from '@platform/ui';
import type { context } from './executor';

/** Вспомогательная функция формирования файла выписки или документа. */
export const getCreateAttachment = (
  useCase: EXPORT_PARAMS_USE_CASES,
  action: ACTION,
  documentType?: TRANSACTION_ATTACHMENT_TYPES
): IActionConfig<typeof context, unknown> => ({
  action: ({ done, fatal, addSucceeded }, { showLoader, hideLoader, service }) => async (docs: IBaseEntity[], statementId?: string) => {
    const isGenerateStatement = [EXPORT_PARAMS_USE_CASES.ONE, EXPORT_PARAMS_USE_CASES.TWO, EXPORT_PARAMS_USE_CASES.FOURTEEN].includes(
      useCase
    );
    const params: Omit<CreateStatementAttachmentRequestDto, 'userDeviceInfo'> = {
      action,
      format: FORMAT.PDF,
      genStatement: isGenerateStatement,
      statementId: statementId!,
      accountingEntriesIds: isGenerateStatement ? [] : docs.map(x => x && Number(x.id)).filter(x => x),
    };
    let otherParams: Partial<CreateStatementAttachmentRequestDto> = {};

    const isShowDialog = !hideExportParamsDialogCases.includes(useCase);

    if (isShowDialog) {
      const [response, close] = await to(showStatementParamsDialog(useCase, action, statementId));

      if (close) {
        done();

        return;
      }

      const { formState } = response!;

      if (fileFormatShowCases.includes(useCase)) {
        params.format = formState.format;
      }

      const baseParams = convertToCreationParams(formState, useCase, documentType);
      const { sign, ...extendedParams } = convertToExtendedCreationParams(formState);

      otherParams = { ...baseParams, ...extendedParams, signed: sign };

      if (otherParams.hideEmptyTurnovers) {
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

    const dto: CreateStatementAttachmentRequestDto = { ...params, ...otherParams, userDeviceInfo };
    const [data, err] = await to(service.createStatementAttachment(dto));

    hideLoader();

    if (err || !data || (data?.content && ((data?.content as unknown) as ArrayBuffer).byteLength === 0)) {
      hideLoader();
      fatal();

      return;
    }

    addSucceeded(data);

    done();
  },
  guardians: [],
  fatalHandler,
});
