import { useEffect, useState } from 'react';
import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { FORMAT } from 'interfaces/client/format';
import type { ACTION } from 'interfaces/common';
import type { IStatementSummaryInfoResponseDto } from 'interfaces/dto';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { DETAIL_DOCUMENT_PARAMS } from 'interfaces/form/detail-document-params';
import { useFormState } from 'react-final-form';
import { useQueryClient } from 'react-query';
import { RUB_CURRENCY } from 'stream-constants';
import type { IFormContext, IFormState } from 'stream-constants/form';
import { defaultFormContextValue } from 'stream-constants/form';

/** Хук с бизнес-логикой для общих данных формы (набор вычисляемых часто используемых значений, несвязанных с основным состоянием). */
export const useFormProvider = (useCase?: EXPORT_PARAMS_USE_CASES, action?: ACTION, statementId?: string) => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState<IFormContext>({ ...defaultFormContextValue, useCase, action });
  const { values } = useFormState<IFormState>();

  const summary = queryClient.getQueryData<IStatementSummaryInfoResponseDto>(['@eco/statement', 'statement', statementId]);
  const hasForeignCurrency = summary?.currencyCode !== RUB_CURRENCY;
  const hasAccounts = true;

  useEffect(() => {
    const newValue: IFormContext = {
      onlyRequestsStatement: values.documentsSetParams.includes(DETAIL_DOCUMENT_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS),
      withSign: values.creationParams.includes(CREATION_PARAMS.WITH_PDF_SIGN),
      withDocumentsSet: values.creationParams.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET),
      isPdf: values.format === FORMAT.PDF,
      useCase,
      action,
      statementId,
      hasForeignCurrency,
      hasAccounts,
    };

    setValue(newValue);
  }, [
    action,
    hasAccounts,
    hasForeignCurrency,
    statementId,
    useCase,
    values.accountIds,
    values.creationParams,
    values.documentsSetParams,
    values.format,
  ]);

  return value;
};
