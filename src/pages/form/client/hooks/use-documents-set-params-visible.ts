import { CREATION_PARAMS } from 'pages/form/client/interfaces/creation-params';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { useFormState } from 'react-final-form';

/** Хук проверки видимости компонента "Детальные параметры комплекта документов". */
export const useDocumentsSetParamsVisible = (): boolean => {
  const { values } = useFormState<IFormState>();

  return values.creationParams.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET);
};
