import { useEffect } from 'react';
import { useForm, useFormState } from 'react-final-form';

/** Хук сабмита формы, если она валидна. */
export const useSubmitQuickFilter = values => {
  const { submit } = useForm();
  const { valid } = useFormState();

  useEffect(() => {
    if (valid) {
      void submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);
};
