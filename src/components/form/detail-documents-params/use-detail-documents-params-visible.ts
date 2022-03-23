import { useContext } from 'react';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import type { IFormContext } from 'interfaces/form/form-context';
import { FormContext } from 'interfaces/form/form-context';
import type { IFormState } from 'interfaces/form/form-state';
import { useFormState } from 'react-final-form';

/** Хук проверки видимости компонента "Детальные параметры комплекта документов". */
export const useDetailDocumentsParamsVisible = (): boolean => {
  const { values } = useFormState<IFormState>();
  const { isPdf } = useContext<IFormContext>(FormContext);

  return values.creationParams.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET) && isPdf;
};
