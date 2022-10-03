import React, { useContext, useEffect, useRef } from 'react';
import { defaultDebitParamsOptions, FormContext, FORM_FIELDS, DEBIT_PARAMS } from 'stream-constants/form';
import type { ICheckboxOption } from '@platform/ui';
import { Fields } from '@platform/ui';

interface DebitParamsProps {
  disabled?: boolean;
}

/** Компонент дебетового комплекта документов. */
export const DebitParams: React.FC<DebitParamsProps> = ({ disabled }) => {
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

  return (
    <Fields.CheckboxGroup
      extraSmall
      columns={12}
      disabled={disabled}
      indent="MD"
      name={FORM_FIELDS.DEBIT_PARAMS}
      options={options.current}
    />
  );
};

DebitParams.displayName = 'DebitParams';
