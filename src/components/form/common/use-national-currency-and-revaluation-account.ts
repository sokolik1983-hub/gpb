import { useContext, useEffect } from 'react';
import { FORMAT } from 'interfaces/client';
import { CREATION_PARAMS } from 'interfaces/form';
import { useForm, useFormState } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELDS, FormContext } from 'stream-constants/form';

export const useNationalCurrencyAndRevaluationAccount = () => {
  const { hasForeignCurrency } = useContext(FormContext);
  const { change } = useForm<IFormState>();
  const { values } = useFormState<IFormState>();

  useEffect(() => {
    const hasAccounts = values.accountIds.length > 0;

    let params = [...values.creationParams];

    if (hasAccounts && !hasForeignCurrency) {
      params = params.filter(x => x !== CREATION_PARAMS.REVALUATION_ACCOUNT_ENTRY);
    }

    if (!hasForeignCurrency || values.format === FORMAT.C1 || values.format === FORMAT.TXT) {
      params = params.filter(x => x !== CREATION_PARAMS.NATIONAL_CURRENCY);
    }

    change(FORM_FIELDS.CREATION_PARAMS, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, hasForeignCurrency, values.format]);
};
