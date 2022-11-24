import type { FormEventHandler } from 'react';
import React, { useMemo } from 'react';
import type { ACTION } from 'interfaces/common';
import { FormContext } from 'stream-constants/form';
import { useFormProvider } from './hooks/use-form-provider';

/** Свойства провайдера формы. */
export interface IFormProviderProps {
  /** Коллбэк отправки формы. */
  onSubmit: FormEventHandler<HTMLFormElement>;
  /** Действие. */
  action?: ACTION;
  /** Идентификатор выписки. */
  statementId?: string;
}

/** Провайдер формы. Компонент для хранения и обработки общих данных на форме (дополнительно заворачивает содержимое в тэг form). */
export const FormProvider: React.FC<IFormProviderProps> = ({ children, onSubmit, action, statementId }) => {
  const value = useFormProvider(action, statementId);

  return <FormContext.Provider value={useMemo(() => value, [value])}>{<form onSubmit={onSubmit}>{children}</form>}</FormContext.Provider>;
};

FormProvider.displayName = 'FormProvider';
