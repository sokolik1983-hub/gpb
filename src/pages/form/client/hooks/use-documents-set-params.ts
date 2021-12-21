import { useEffect, useRef } from 'react';
import { CREATION_PARAMS } from 'pages/form/client/interfaces/creation-params';
import { defaultDocumentsSetParamsOptions } from 'pages/form/client/interfaces/documents-set-params';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { useForm } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Детальные параметры комплекта документов". */
export const useDocumentsSetParams = (): [string[], ICheckboxOption[]] => {
  const { getState } = useForm<IFormState>();
  const formState = getState();

  const { values } = formState;

  const options = useRef<ICheckboxOption[]>([]);
  const value = useRef<string[]>([]);

  useEffect(() => {
    const withSign = values.creationParams.includes(CREATION_PARAMS.WITH_SIGN);

    options.current = defaultDocumentsSetParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      acc.push({ ...x, disabled: withSign });

      return acc;
    }, []);
  }, [values.creationParams]);

  return [value.current, options.current];
};
