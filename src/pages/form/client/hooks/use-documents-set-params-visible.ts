import { useContext } from 'react';
import { CREATION_PARAMS } from 'pages/form/client/interfaces/creation-params';
import type { IFormContext } from 'pages/form/client/interfaces/form-context';
import { FormContext } from 'pages/form/client/interfaces/form-context';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { useFormState } from 'react-final-form';

/** Хук проверки видимости компонента "Детальные параметры комплекта документов". */
export const useDocumentsSetParamsVisible = (): boolean => {
  const { values } = useFormState<IFormState>();
  const { isPdf } = useContext<IFormContext>(FormContext);

  return values.creationParams.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET) && isPdf;
};
