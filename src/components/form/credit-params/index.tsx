import React, { useContext, useEffect, useRef } from 'react';
import { FORM_FIELDS, DEBIT_PARAMS, FormContext, defaultCreditParamsOptions } from 'stream-constants/form';
import { alwaysSendParamCasesFromUI } from 'utils/export-params-dialog';
import type { ICheckboxOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Компонент кредитного комплекта документов. */
export const CreditParams: React.FC = () => {
  const options = useRef<ICheckboxOption[]>([]);
  const { onlyRequestsStatement, withSign, useCase } = useContext(FormContext);

  useEffect(() => {
    options.current = defaultCreditParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      if (useCase && alwaysSendParamCasesFromUI.includes(useCase) && x.value === DEBIT_PARAMS.INCLUDE_STATEMENTS) {
        acc.push({ ...x, disabled: true });
      } else {
        const disabled = onlyRequestsStatement || withSign;

        acc.push({ ...x, disabled });
      }

      return acc;
    }, []);
  }, [onlyRequestsStatement, useCase, withSign]);

  return <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.CREDIT_PARAMS} options={options.current} />;
};

CreditParams.displayName = 'CreditParams';
