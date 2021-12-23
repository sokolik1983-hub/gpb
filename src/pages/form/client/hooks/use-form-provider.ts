import { useEffect, useRef } from 'react';
import { FORMAT } from 'interfaces/client/classificators/format';
import { CREATION_PARAMS } from 'pages/form/client/interfaces/creation-params';
import { DOCUMENTS_SET_PARAMS } from 'pages/form/client/interfaces/documents-set-params';
import type { IFormContext } from 'pages/form/client/interfaces/form-context';
import { defaultFormContextValue } from 'pages/form/client/interfaces/form-context';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { useFormState } from 'react-final-form';

/** Хук с бизнес-логикой для общих данных формы (набор вычисляемых часто используемых значений, несвязанных с основным состоянием). */
export const useFormProvider = () => {
  const value = useRef<IFormContext>(defaultFormContextValue);
  const { values } = useFormState<IFormState>();

  useEffect(() => {
    const newValue: IFormContext = {
      onlyRequestsStatement: values.documentsSetParams.includes(DOCUMENTS_SET_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS),
      withSign: values.creationParams.includes(CREATION_PARAMS.WITH_SIGN),
      isPdf: values.fileFormat === FORMAT.PDF,
    };

    value.current = newValue;
  }, [values.creationParams, values.documentsSetParams, values.fileFormat]);

  return value.current;
};
