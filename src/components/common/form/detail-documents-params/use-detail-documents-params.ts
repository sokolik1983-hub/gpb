import { useContext, useEffect, useRef } from 'react';
import { useForm, useFormState } from 'react-final-form';
import { CREDIT_PARAMS, DEBIT_PARAMS, defaultDocumentsSetParamsOptions, FORM_FIELDS, FormContext } from 'stream-constants/form';
import type { IFormState } from 'stream-constants/form';
import { checkedDebitAndCreditParams } from 'utils/admin';
import { creationParamsShowCases } from 'utils/client';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Детальные параметры комплекта документов". */
export const useDetailDocumentsParams = (): [ICheckboxOption[]] => {
  const { onlyRequestsStatement, useCase } = useContext(FormContext);
  const { batch, change } = useForm();
  const { values } = useFormState<IFormState>();

  const options = useRef<ICheckboxOption[]>([]);

  useEffect(() => {
    if (useCase && !creationParamsShowCases.includes(useCase)) {
      if (onlyRequestsStatement) {
        batch(() => {
          change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_STATEMENTS]);
          change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_STATEMENTS]);
        });
      } else if (checkedDebitAndCreditParams.includes(useCase)) {
        batch(() => {
          change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_STATEMENTS, CREDIT_PARAMS.INCLUDE_ORDERS]);
          change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_STATEMENTS, DEBIT_PARAMS.INCLUDE_ORDERS]);
        });
      } else {
        batch(() => {
          change(FORM_FIELDS.CREDIT_PARAMS, []);
          change(FORM_FIELDS.DEBIT_PARAMS, []);
        });
      }
    }
  }, [batch, change, onlyRequestsStatement, useCase]);

  useEffect(() => {
    options.current = defaultDocumentsSetParamsOptions;
  }, [values.creationParams]);

  return [options.current];
};
