import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import type { IFormState } from 'interfaces/form/form-state';
import { useFormState } from 'react-final-form';

/** Хук проверки видимости компонента "Детальные параметры комплекта документов". */
export const useDetailDocumentsParamsVisible = (): boolean => {
  const { values } = useFormState<IFormState>();

  return values.creationParams.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET);
};
