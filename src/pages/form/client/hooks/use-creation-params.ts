import { useEffect, useRef } from 'react';
import { FORMAT } from 'interfaces/client/classificators/format';
import { SEPARATE_ACCOUNTS_FILES, WITH_DOCUMENTS_SET, WITH_SIGN } from 'pages/form/client/interfaces/creation-params';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Параметры создания выписки". */
export const useCreationParams = (defaultOptions: ICheckboxOption[]): [string[], ICheckboxOption[]] => {
  const { change, getState } = useForm<IFormState>();
  const formState = getState();

  const { values } = formState;

  const options = useRef<ICheckboxOption[]>([]);
  const value = useRef<string[]>([]);

  useEffect(() => {
    const hasMoreThenOneAccounts = values.accountIds.length > 1;
    const isPdf = values.fileFormat === FORMAT.PDF;

    if (hasMoreThenOneAccounts) {
      value.current.push(SEPARATE_ACCOUNTS_FILES);
    }

    if (isPdf) {
      value.current.push(WITH_SIGN);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // FIXME разобраться с типизацией позднее
    change(FORM_FIELDS.CREATION_PARAMS, value.current);

    options.current = defaultOptions.reduce<ICheckboxOption[]>((acc, x) => {
      switch (x.value) {
        case SEPARATE_ACCOUNTS_FILES:
          acc.push({ ...x, disabled: !hasMoreThenOneAccounts });
          break;
        case WITH_DOCUMENTS_SET:
        case WITH_SIGN:
          acc.push({ ...x, disabled: !isPdf });
          break;
        default:
          acc.push(x);
      }

      return acc;
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.accountIds, values.fileFormat]);

  return [value.current, options.current];
};
