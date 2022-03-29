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
  const isExcel = format === FORMAT.EXCEL;

  useEffect(() => {
    if (!hasMoreThenOneAccounts) {
      if (hasSeparateAccountsFiles) {
        change(
          FORM_FIELDS.CREATION_PARAMS,
          params.filter(x => x !== CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES)
        );
      }

      return;
    }

    if (isExcel && !hasSeparateAccountsFiles) {
      params.push(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES);
      change(FORM_FIELDS.CREATION_PARAMS, params);
    } else if (!isExcel && hasSeparateAccountsFiles) {
      change(
        FORM_FIELDS.CREATION_PARAMS,
        params.filter(x => x !== CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES)
      );
    }
    // триггерим хук либо при выборе счетов, либо на изменение формата
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMoreThenOneAccounts, isExcel]);
};
