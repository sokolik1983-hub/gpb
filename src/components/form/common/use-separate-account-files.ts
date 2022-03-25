import { useEffect } from 'react';
import { FORMAT } from 'interfaces/client';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import type { IFormState } from 'interfaces/form/form-state';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { useForm, useFormState } from 'react-final-form';

/** Хук установки / измнения состояния флага "Отдельный файл по каждому счету". */
export const useSeparateAccountFiles = () => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();
  const { creationParams, accountIds, format } = values;
  const params = [...creationParams];

  const hasMoreThenOneAccounts = accountIds.length > 1;
  const hasSeparateAccountsFiles = params.includes(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES);

  useEffect(() => {
    // хук работает только в случае выбора нескольких счетов
    if (!hasMoreThenOneAccounts) {
      return;
    }

    if (format === FORMAT.EXCEL && !hasSeparateAccountsFiles) {
      params.push(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES);
      change(FORM_FIELDS.CREATION_PARAMS, params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMoreThenOneAccounts, hasSeparateAccountsFiles, format]);
};
