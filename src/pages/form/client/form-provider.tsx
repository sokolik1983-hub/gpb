import type { FormEventHandler } from 'react';
import React, { useMemo } from 'react';
import type { EXPORT_PARAMS_USE_CASES, ACTION } from 'interfaces/client';
import { FormContext } from 'interfaces/form/form-context';
import { useFormProvider } from './hooks/use-form-provider';

/** Свойства провайдера формы. */
export interface IFormProviderProps {
  /** Коллбэк отправки формы. */
  onSubmit: FormEventHandler<HTMLFormElement>;
  /** Вариант вызова диалога. */
  useCase?: EXPORT_PARAMS_USE_CASES;
  /** Действие. */
  action?: ACTION;
}

/** Провайдер формы. Компонент для хранения и обработки общих данных на форме (дополнительно заворачивает содержимое в тэг form). */
export const FormProvider: React.FC<IFormProviderProps> = ({ children, onSubmit, useCase, action }) => {
  const value = useFormProvider(useCase, action);

  return <FormContext.Provider value={useMemo(() => value, [value])}>{<form onSubmit={onSubmit}>{children}</form>}</FormContext.Provider>;
};

FormProvider.displayName = 'FormProvider';
