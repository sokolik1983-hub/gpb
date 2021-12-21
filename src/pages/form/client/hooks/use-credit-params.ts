import { useEffect, useRef } from 'react';
import { defaultCreditParamsOptions } from 'pages/form/client/interfaces/credit-params';
import { DOCUMENTS_SET_PARAMS } from 'pages/form/client/interfaces/documents-set-params';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { useForm, useFormState } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Детальные параметры комплекта документов. Кредитовые документы". */
export const useCreditParams = (): [ICheckboxOption[]] => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();

  const options = useRef<ICheckboxOption[]>([]);

  const onlyRequestsStatement = values.documentsSetParams.includes(DOCUMENTS_SET_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS);

  useEffect(() => {
    options.current = defaultCreditParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      acc.push({ ...x, disabled: onlyRequestsStatement });

      return acc;
    }, []);
  }, [change, onlyRequestsStatement]);

  return [options.current];
};
