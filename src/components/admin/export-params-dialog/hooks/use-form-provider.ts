import { useEffect, useState } from 'react';
import type { StatementSummary } from 'interfaces/admin';
import type { ACTION } from 'interfaces/common';
import { FORMAT } from 'interfaces/common';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { DETAIL_DOCUMENT_PARAMS } from 'interfaces/form/detail-document-params';
import { useFormState } from 'react-final-form';
import { useQueryClient } from 'react-query';
import { RUB_CURRENCY } from 'stream-constants';
import { PREFIX } from 'stream-constants/admin';
import type { IFormContext, IFormState } from 'stream-constants/form';
import { defaultFormContextValue } from 'stream-constants/form';

/** Хук с бизнес-логикой для общих данных формы (набор вычисляемых часто используемых значений, несвязанных с основным состоянием). */
export const useFormProvider = (action?: ACTION, statementId?: string) => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState<IFormContext>({ ...defaultFormContextValue, action });
  const { values } = useFormState<IFormState>();

  const summary = queryClient.getQueryData<StatementSummary>([PREFIX, '@eco/statement', 'statementSummary', statementId]);
  const hasForeignCurrency = summary?.currencyGroups.some(x => x.currencyCode !== RUB_CURRENCY);
  const hasAccounts = true;

  useEffect(() => {
    const newValue: IFormContext = {
      onlyRequestsStatement: values.documentsSetParams.includes(DETAIL_DOCUMENT_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS),
      withSign: values.creationParams.includes(CREATION_PARAMS.WITH_PDF_SIGN),
      withDocumentsSet: values.creationParams.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET),
      isPdf: values.format === FORMAT.PDF,
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
    values.accountIds,
    values.creationParams,
    values.documentsSetParams,
    values.format,
  ]);

  return value;
};
