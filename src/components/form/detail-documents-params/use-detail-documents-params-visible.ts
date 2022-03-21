import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { useFormState } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';

/** Хук проверки видимости компонента "Детальные параметры комплекта документов". */
export const useDetailDocumentsParamsVisible = (): boolean => {
  const { values } = useFormState<IFormState>();

  return values.creationParams.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET);
};
