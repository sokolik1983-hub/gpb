import React, { useContext, useEffect, useRef } from 'react';
import { defaultCreditParamsOptions } from 'pages/form/client/interfaces/credit-params';
import { FormContext } from 'pages/form/client/interfaces/form-context';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Компонент кредитного комплекта документов. */
export const CreditParams: React.FC = () => {
  const { change } = useForm();
  const options = useRef<ICheckboxOption[]>([]);
  const { onlyRequestsStatement, withSign } = useContext(FormContext);

  useEffect(() => {
    options.current = defaultCreditParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      acc.push({ ...x, disabled: onlyRequestsStatement || withSign });

      return acc;
    }, []);
  }, [change, withSign, onlyRequestsStatement]);

  return <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.CREDIT_PARAMS} options={options.current} />;
};

CreditParams.displayName = 'CreditParams';
