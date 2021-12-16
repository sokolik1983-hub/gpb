import { useEffect, useRef } from 'react';
import { WITH_SIGN } from 'pages/form/client/interfaces/creation-params';
import { ONLY_REQUEST_STATEMENT_DOCUMENTS, SEPARATE_DOCUMENTS_FILES } from 'pages/form/client/interfaces/documents-set-params';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Детальные параметры комплекта документов". */
export const useDocumentsSetParams = (defaultOptions: ICheckboxOption[]): [string[], ICheckboxOption[]] => {
  const { change, getState } = useForm<IFormState>();
  const formState = getState();

  const { values } = formState;

  const options = useRef<ICheckboxOption[]>([]);
  const value = useRef<string[]>([]);

  useEffect(() => {
    const withSign = values.creationParams.includes(WITH_SIGN);

    if (withSign) {
      value.current.push(SEPARATE_DOCUMENTS_FILES, ONLY_REQUEST_STATEMENT_DOCUMENTS);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // FIXME разобраться с типизацией позднее
    change(FORM_FIELDS.DOCUMENTS_SET_PARAMS, value.current);

    options.current = defaultOptions.reduce<ICheckboxOption[]>((acc, x) => {
      acc.push({ ...x, disabled: withSign });

      return acc;
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.creationParams]);

  return [value.current, options.current];
};
