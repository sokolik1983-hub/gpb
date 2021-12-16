import { WITH_DOCUMENTS_SET } from 'pages/form/client/interfaces/creation-params';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { useForm } from 'react-final-form';

/** Хук проверки видимости компонента "Детальные параметры комплекта документов". */
export const useDocumentsSetParamsVisible = (): boolean => {
  const { getState } = useForm<IFormState>();

  const formState = getState();

  const { values } = formState;

  return values.creationParams.includes(WITH_DOCUMENTS_SET);
};
