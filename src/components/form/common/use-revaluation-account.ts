import { useContext, useEffect } from 'react';
import { CREATION_PARAMS } from 'interfaces/form';
import { useForm, useFormState } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELDS, FormContext } from 'stream-constants/form';

export const useRevaluationAccount = () => {
  const { hasForeignCurrency } = useContext(FormContext);
  const { change } = useForm<IFormState>();
  const { values } = useFormState<IFormState>();

  const hasAccounts = values.accountIds.length > 0;

  useEffect(() => {
    console.log('start hook useRevaluationAccount');
    console.log('state creationParams', values);

    if (hasAccounts && !hasForeignCurrency) {
      console.log(
        'commit change REVALUATION_ACCOUNT_ENTRY',
        values.creationParams.filter(x => x !== CREATION_PARAMS.REVALUATION_ACCOUNT_ENTRY)
      );
      change(
        FORM_FIELDS.CREATION_PARAMS,
        values.creationParams.filter(x => x !== CREATION_PARAMS.REVALUATION_ACCOUNT_ENTRY)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, hasAccounts, hasForeignCurrency]);
};
