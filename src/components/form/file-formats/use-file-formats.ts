import { useContext, useEffect, useRef } from 'react';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { fileFormatOptions } from 'interfaces/form/file-format';
import type { IFormContext } from 'interfaces/form/form-context';
import { FormContext } from 'interfaces/form/form-context';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import type { IFormState } from 'interfaces/form/form-state';
import { useForm, useFormState } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Формат файла выписки". */
export const useFileFormats = (): [ICheckboxOption[]] => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();
  const { isPdf } = useContext<IFormContext>(FormContext);

  const options = useRef<ICheckboxOption[]>(fileFormatOptions);

  useEffect(() => {
    if (!isPdf) {
      const params = values.creationParams.filter(x => x !== CREATION_PARAMS.WITH_SIGN);

      change(FORM_FIELDS.CREATION_PARAMS, params);
    }
  }, [change, isPdf, values.creationParams]);

  return [options.current];
};
