import React, { useContext, useEffect, useRef } from 'react';
import { FORM_FIELDS, FormContext, defaultCreditParamsOptions, CREDIT_PARAMS } from 'stream-constants/form';
import type { ICheckboxOption } from '@platform/ui';
import { Fields } from '@platform/ui';

interface CreditParamsProps {
  disabled?: boolean;
}

/** Компонент кредитного комплекта документов. */
export const CreditParams: React.FC<CreditParamsProps> = ({ disabled }) => {
  const options = useRef<ICheckboxOption[]>([]);
  const { onlyRequestsStatement } = useContext(FormContext);

  useEffect(() => {
    options.current = defaultCreditParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      if (onlyRequestsStatement) {
        return x.value === CREDIT_PARAMS.INCLUDE_STATEMENTS ? [...acc, { ...x, disabled: false }] : acc;
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
      name={FORM_FIELDS.CREDIT_PARAMS}
      options={options.current}
    />
  );
};

CreditParams.displayName = 'CreditParams';
