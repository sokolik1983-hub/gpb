import React, { useContext, useEffect, useRef } from 'react';
import { defaultDebitParamsOptions, FormContext, FORM_FIELDS, DEBIT_PARAMS } from 'stream-constants/form';
import type { ICheckboxOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Компонент дебетового комплекта документов. */
export const DebitParams: React.FC = () => {
  const options = useRef<ICheckboxOption[]>([]);
  const { onlyRequestsStatement } = useContext(FormContext);

  useEffect(() => {
    options.current = defaultDebitParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      if (onlyRequestsStatement) {
        return x.value === DEBIT_PARAMS.INCLUDE_STATEMENTS ? [...acc, { ...x, disabled: false }] : acc;
      }

      return [...acc, { ...x, disabled: false }];
    }, []);
  }, [onlyRequestsStatement]);

  return <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.DEBIT_PARAMS} options={options.current} />;
};

DebitParams.displayName = 'DebitParams';
