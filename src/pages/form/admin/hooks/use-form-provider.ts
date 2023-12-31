import { useEffect, useState } from 'react';
import { useAccounts } from 'hooks/common/use-accounts';
import { FORMAT } from 'interfaces/common';
import type { ACTION } from 'interfaces/common';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { DETAIL_DOCUMENT_PARAMS } from 'interfaces/form/detail-document-params';
import { useFormState } from 'react-final-form';
import { RUB_CURRENCY } from 'stream-constants';
import type { IFormContext, IFormState } from 'stream-constants/form';
import { defaultFormContextValue } from 'stream-constants/form';

/** Хук с бизнес-логикой для общих данных формы (набор вычисляемых часто используемых значений, несвязанных с основным состоянием). */
export const useFormProvider = (action?: ACTION, statementId?: string) => {
  const { data: accounts } = useAccounts();
  const [value, setValue] = useState<IFormContext>({ ...defaultFormContextValue, action });
  const { values } = useFormState<IFormState>();
  const hasForeignCurrency = accounts.filter(x => values.accountIds.includes(x.id)).some(acc => acc.currency.code !== RUB_CURRENCY);
  const hasAccounts = values.accountIds.length > 0;

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
