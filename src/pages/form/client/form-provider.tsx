import type { FormEventHandler } from 'react';
import React, { useMemo } from 'react';
import { FormContext } from 'interfaces/form/form-context';
import { useFormProvider } from './hooks/use-form-provider';

/** Свойства провайдера формы. */
export interface IFormProviderProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

/** Провайдер формы. Компонент для хранения и обработки общих данных на форме (дополнительно заворачивает содержимое в тэг form). */
export const FormProvider: React.FC<IFormProviderProps> = ({ children, onSubmit }) => {
  const value = useFormProvider();

  return <FormContext.Provider value={useMemo(() => value, [value])}>{<form onSubmit={onSubmit}>{children}</form>}</FormContext.Provider>;
};

FormProvider.displayName = 'FormProvider';
