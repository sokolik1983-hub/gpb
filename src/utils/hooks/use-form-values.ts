import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { useForm } from 'react-final-form';

/** Хук для получения значений формы. */
export const useFormValues = () => {
  const { getState } = useForm<IFormState>();

  const formState = getState();

  const { values } = formState;

  return values;
};
