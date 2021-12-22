import { useContext, useEffect, useRef } from 'react';
import { CREATION_PARAMS } from 'pages/form/client/interfaces/creation-params';
import { fileFormatOptions } from 'pages/form/client/interfaces/file-format';
import type { IFormContext } from 'pages/form/client/interfaces/form-context';
import { FormContext } from 'pages/form/client/interfaces/form-context';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm, useFormState } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';

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

    // change(FORM_FIELDS.FILE_FORMAT, values.fileFormat)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, isPdf]);

  return [options.current];
};
