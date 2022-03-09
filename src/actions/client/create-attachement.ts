import { showStatementParamsDialog } from 'components/export-params-dialog';
import type { IStatementHistoryRow } from 'interfaces/client';
import { ACTION, EXPORT_PARAMS_USE_CASES, FORMAT } from 'interfaces/client';
import type { ICreateAttachmentRequestDto } from 'interfaces/dto';
import { convertToCreationParams, convertToExtendedCreationParams, fatalHandler, fileFormatShowCases, getUserDeviceInfo } from 'utils';
import { showExportParamsDialogCases } from 'utils/export-params-dialog';
import { to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import type { context } from './executor';

/** Вспомогательная функция формирования файла выписки или документа. */
export const getCreateAttachment = (useCase: EXPORT_PARAMS_USE_CASES, action: ACTION): IActionConfig<typeof context, unknown> => ({
  action: ({ done, fatal, addSucceeded }, { showLoader, hideLoader, service }) => async (docs: IBaseEntity[], statementId?: string) => {
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

    const isShowDialog = showExportParamsDialogCases.includes(useCase);

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
      const [formState, close] = await to(showStatementParamsDialog(useCase));

      if (close) {
        done();

        return;
      }

      if (fileFormatShowCases.includes(useCase)) {
        params.format = formState!.format;
      }

      const baseParams = convertToCreationParams(formState!);
      const { sign, ...extendedParams } = convertToExtendedCreationParams(formState!);

      otherParams = { ...baseParams, ...extendedParams, signed: sign };
    }

    showLoader();

    const userDeviceInfo = await getUserDeviceInfo();

    const dto: ICreateAttachmentRequestDto = { ...params, ...otherParams, userDeviceInfo };
    const [data, err] = await to(service.createAttachment(dto));

    hideLoader();

    fatal(data?.error);
    fatal(err);

    addSucceeded(data);

    done();
  },
  guardians: [],
  fatalHandler,
});
