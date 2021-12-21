import type { FormEventHandler } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { CREATION_PARAMS } from 'pages/form/client/interfaces/creation-params';
import { DOCUMENTS_SET_PARAMS } from 'pages/form/client/interfaces/documents-set-params';
import type { IFormContext } from 'pages/form/client/interfaces/form-context';
import { defaultFormContextValue, FormContext } from 'pages/form/client/interfaces/form-context';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { useFormState } from 'react-final-form';

export interface IFormProviderProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const FormProvider: React.FC<IFormProviderProps> = ({ children, onSubmit }) => {
  const [value, setValue] = useState<IFormContext>(defaultFormContextValue);
  const { values } = useFormState<IFormState>();

  useEffect(() => {
    const newValue: IFormContext = {
      onlyRequestsStatement: values.documentsSetParams.includes(DOCUMENTS_SET_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS),
      withSign: values.creationParams.includes(CREATION_PARAMS.WITH_SIGN),
    };

    setValue(newValue);
  }, [values.creationParams, values.documentsSetParams]);

  return <FormContext.Provider value={useMemo(() => value, [value])}>{<form onSubmit={onSubmit}>{children}</form>}</FormContext.Provider>;
};

FormProvider.displayName = 'FormProvider';
