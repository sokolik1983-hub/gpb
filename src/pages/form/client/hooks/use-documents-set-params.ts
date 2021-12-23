import { useContext, useEffect, useRef } from 'react';
import { defaultDocumentsSetParamsOptions } from 'pages/form/client/interfaces/documents-set-params';
import { FormContext } from 'pages/form/client/interfaces/form-context';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { useForm } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Детальные параметры комплекта документов". */
export const useDocumentsSetParams = (): [string[], ICheckboxOption[]] => {
  const { withSign } = useContext(FormContext);
  const { getState } = useForm<IFormState>();
  const formState = getState();
  const { values } = formState;

  const options = useRef<ICheckboxOption[]>([]);
  const value = useRef<string[]>([]);

  useEffect(() => {
    options.current = defaultDocumentsSetParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      acc.push({ ...x, disabled: withSign });

      return acc;
    }, []);
  }, [values.creationParams, withSign]);

  return [value.current, options.current];
};
