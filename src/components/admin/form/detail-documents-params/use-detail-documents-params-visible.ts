import { useContext } from 'react';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { useFormState } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import type { IFormContext } from 'stream-constants/form/form-context';
import { FormContext } from 'stream-constants/form/form-context';

/** Хук проверки видимости компонента "Детальные параметры комплекта документов". */
export const useDetailDocumentsParamsVisible = (): boolean => {
  const { values } = useFormState<IFormState>();
  const { isPdf } = useContext<IFormContext>(FormContext);

  return values.creationParams.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET) && isPdf;
};
