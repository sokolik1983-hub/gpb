import { useEffect } from 'react';
import { FORMAT } from 'interfaces/client';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { useForm, useFormState } from 'react-final-form';
import type { IFormState } from 'stream-constants/form/form-state';
import { FORM_FIELDS } from 'stream-constants/form/form-state';

/** Хук установки / измнения состояния флага "Отдельный файл по каждому счету". */
export const useSeparateAccountFiles = () => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();
  const { creationParams, format, accountIds } = values;
  const params = [...creationParams];
  const hasMoreThenOneAccounts = accountIds.length > 1;

  const hasSeparateAccountsFiles = params.includes(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES);

  useEffect(() => {
    if ((format === FORMAT.TXT || format === FORMAT.EXCEL) && !hasSeparateAccountsFiles && hasMoreThenOneAccounts) {
      params.push(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES);
      change(FORM_FIELDS.CREATION_PARAMS, params);
    } else if ((format === FORMAT.C1 || format === FORMAT.PDF) && hasSeparateAccountsFiles) {
      change(
        FORM_FIELDS.CREATION_PARAMS,
        params.filter(x => x !== CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES)
      );
    }
    // триггерим хук на изменение формата
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, hasMoreThenOneAccounts]);
};
