import { useEffect } from 'react';
import { usePrevious } from 'hooks/common/use-previous';
import { useForm, useFormState } from 'react-final-form';

/** Входные данные хука useSubmitScrollerFilter. */
interface UseSubmitQuickFilterRequest<T = Record<string, any>> {
  /** Функция установки признака смешивания данных формы и локального хранилища для отправки на сервер. */
  applyMixValuesFormAndStorage?(value: boolean): void;
  /** Зависимости срабатывания сабмита формы. */
  submitDep: T;
}

/** Хук сабмита формы скроллера, если она валидна. */
export const useSubmitScrollerFilter = <T = Record<string, any>>({
  submitDep,
  applyMixValuesFormAndStorage,
}: UseSubmitQuickFilterRequest<T>) => {
  const { submit } = useForm();
  const { valid } = useFormState();

  const prevValid = usePrevious(valid);

  useEffect(() => {
    if (valid) {
      applyMixValuesFormAndStorage?.(Boolean(prevValid));

      void submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.values(submitDep)]);
};
