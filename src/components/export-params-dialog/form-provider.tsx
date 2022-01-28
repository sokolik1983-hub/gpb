import type { FormEventHandler } from 'react';
import React, { useMemo } from 'react';
import { useFormProvider } from 'components/export-params-dialog/hooks/use-form-provider';
import type { EXPORT_PARAMS_USE_CASES } from 'components/export-params-dialog/statemet-params-use-cases';
import { FormContext } from 'interfaces/form/form-context';

/** Свойства провайдера формы. */
export interface IFormProviderProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  /** Вариант вызова диалога. */
  useCase: EXPORT_PARAMS_USE_CASES;
}

/** Провайдер формы. Компонент для хранения и обработки общих данных на форме (дополнительно заворачивает содержимое в тэг form). */
export const FormProvider: React.FC<IFormProviderProps> = ({ children, onSubmit, useCase }) => {
  const value = useFormProvider(useCase);

  return <FormContext.Provider value={useMemo(() => value, [value])}>{<form onSubmit={onSubmit}>{children}</form>}</FormContext.Provider>;
};

FormProvider.displayName = 'FormProvider';
