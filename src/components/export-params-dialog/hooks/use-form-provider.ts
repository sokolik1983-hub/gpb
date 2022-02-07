import { useEffect, useState } from 'react';
import type { EXPORT_PARAMS_USE_CASES } from 'components/export-params-dialog/statemet-params-use-cases';
import { FORMAT } from 'interfaces/client/classificators/format';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { DETAIL_DOCUMENT_PARAMS } from 'interfaces/form/detail-document-params';
import type { IFormContext } from 'interfaces/form/form-context';
import { defaultFormContextValue } from 'interfaces/form/form-context';
import type { IFormState } from 'interfaces/form/form-state';
import { useFormState } from 'react-final-form';

/** Хук с бизнес-логикой для общих данных формы (набор вычисляемых часто используемых значений, несвязанных с основным состоянием). */
export const useFormProvider = (useCase: EXPORT_PARAMS_USE_CASES) => {
  const [value, setValue] = useState<IFormContext>({ useCase, ...defaultFormContextValue });
  const { values } = useFormState<IFormState>();

  useEffect(() => {
    const newValue: IFormContext = {
      onlyRequestsStatement: values.documentsSetParams.includes(DETAIL_DOCUMENT_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS),
      withSign: values.creationParams.includes(CREATION_PARAMS.WITH_SIGN),
      isPdf: values.format === FORMAT.PDF,
      useCase,
    };

    setValue(newValue);
  }, [useCase, values.creationParams, values.documentsSetParams, values.format]);

  return value;
};