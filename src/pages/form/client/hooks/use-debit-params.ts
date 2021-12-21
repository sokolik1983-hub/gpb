import { useContext, useEffect, useRef } from 'react';
import { defaultDebitParamsOptions } from 'pages/form/client/interfaces/debit-params';
import { FormContext } from 'pages/form/client/interfaces/form-context';
import { useForm } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Детальные параметры комплекта документов. Дебетовые документы". */
export const useDebitParams = (): [ICheckboxOption[]] => {
  const { change } = useForm();
  const options = useRef<ICheckboxOption[]>([]);
  const { onlyRequestsStatement } = useContext(FormContext);

  useEffect(() => {
    options.current = defaultDebitParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      acc.push({ ...x, disabled: onlyRequestsStatement });

      return acc;
    }, []);
  }, [change, onlyRequestsStatement]);

  return [options.current];
};
