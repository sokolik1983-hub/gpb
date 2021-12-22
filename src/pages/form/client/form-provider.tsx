import type { FormEventHandler } from 'react';
import React, { useMemo } from 'react';
import { useFormProvider } from 'pages/form/client/hooks/use-form-provider';
import { FormContext } from 'pages/form/client/interfaces/form-context';

export interface IFormProviderProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const FormProvider: React.FC<IFormProviderProps> = ({ children, onSubmit }) => {
  const value = useFormProvider();

  return <FormContext.Provider value={useMemo(() => value, [value])}>{<form onSubmit={onSubmit}>{children}</form>}</FormContext.Provider>;
};

FormProvider.displayName = 'FormProvider';
