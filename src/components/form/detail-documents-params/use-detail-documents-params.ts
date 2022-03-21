import { useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-final-form';
import { defaultDocumentsSetParamsOptions, FormContext } from 'stream-constants/form';
import type { IFormState } from 'stream-constants/form';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Детальные параметры комплекта документов". */
export const useDetailDocumentsParams = (): [ICheckboxOption[]] => {
  const { withSign } = useContext(FormContext);
  const { getState } = useForm<IFormState>();
  const formState = getState();
  const { values } = formState;

  const options = useRef<ICheckboxOption[]>([]);

  useEffect(() => {
    options.current = defaultDocumentsSetParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      acc.push({ ...x, disabled: withSign });

      return acc;
    }, []);
  }, [values.creationParams, withSign]);

  return [options.current];
};
