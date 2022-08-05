import { useContext, useEffect } from 'react';
import { FORMAT } from 'interfaces/client';
import { CREATION_PARAMS } from 'interfaces/form';
import { useForm, useFormState } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELDS, FormContext } from 'stream-constants/form';

export const useNationalCurrency = () => {
  const { hasForeignCurrency } = useContext(FormContext);
  const { change } = useForm<IFormState>();
  const { values } = useFormState<IFormState>();

  useEffect(() => {
    console.log('start hook useNationalCurrency');
    console.log('state creationParams', values);

    if (!hasForeignCurrency || values.format === FORMAT.C1 || values.format === FORMAT.TXT) {
      console.log(
        'commit change NATIONAL_CURRENCY',
        values.creationParams.filter(x => x !== CREATION_PARAMS.NATIONAL_CURRENCY)
      );
      change(
        FORM_FIELDS.CREATION_PARAMS,
        values.creationParams.filter(x => x !== CREATION_PARAMS.NATIONAL_CURRENCY)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, hasForeignCurrency, values.format]);
};
