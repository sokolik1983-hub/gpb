import { WITH_DOCUMENTS_SET } from 'pages/form/client/interfaces/creation-params';
import { useFormValues } from 'utils/hooks/use-form-values';

/** Хук проверки видимости компонента "Детальные параметры комплекта документов". */
export const useDocumentsSetParamsVisible = (): boolean => {
  const values = useFormValues();

  return values.creationParams.includes(WITH_DOCUMENTS_SET);
};
