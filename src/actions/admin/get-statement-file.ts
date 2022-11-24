import { showStatementParamsDialog } from 'components/admin/export-params-dialog';
import type { CreateStatementAttachmentRequestDto } from 'interfaces/admin';
import type { TRANSACTION_ATTACHMENT_TYPES } from 'interfaces/common';
import { ACTION, FORMAT } from 'interfaces/common';
import { locale } from 'localization';
import { convertToCreationParams, convertToExtendedCreationParams } from 'utils/admin';
import { fatalHandler } from 'utils/common';
import { to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { dialog } from '@platform/ui';
import type { context } from './executor';

/** Вспомогательная функция формирования файла выписки или документа. */
export const getStatementFile = (
  action: ACTION,
  hideDialog: boolean = false,
  documentType?: TRANSACTION_ATTACHMENT_TYPES
): IActionConfig<typeof context, unknown> => ({
  action: ({ done, fatal, addSucceeded }, { showLoader, hideLoader, service }) => async (docs: IBaseEntity[], statementId: string) => {
    const isGenerateStatement = docs.length === 0;
    const params: Omit<CreateStatementAttachmentRequestDto, 'userDeviceInfo'> = {
      action,
      format: FORMAT.PDF,
      genStatement: isGenerateStatement,
      statementId,
      accountingEntriesIds: docs.map(x => x && Number(x.id)).filter(x => x),
    };
    let otherParams: Partial<CreateStatementAttachmentRequestDto> = {};

    if (!hideDialog) {
      const [response, close] = await to(
        showStatementParamsDialog({ action, statementId, options: { withEntriesList: !isGenerateStatement } })
      );

      if (close) {
        done();

        return;
      }

      const { formState } = response!;

      if (ACTION.PRINT !== action) {
        params.format = formState.format;
      }

      const baseParams = convertToCreationParams(formState, !isGenerateStatement, documentType);
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
    }

    showLoader();

    const dto: CreateStatementAttachmentRequestDto = { ...params, ...otherParams };
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
