import { useContext, useEffect, useRef } from 'react';
import { FORMAT } from 'interfaces/client/classificators/format';
import { CREATION_PARAMS, defaultCreationParamsOptions } from 'pages/form/client/interfaces/creation-params';
import { CREDIT_PARAMS } from 'pages/form/client/interfaces/credit-params';
import { DEBIT_PARAMS } from 'pages/form/client/interfaces/debit-params';
import { DOCUMENTS_SET_PARAMS } from 'pages/form/client/interfaces/documents-set-params';
import { FormContext } from 'pages/form/client/interfaces/form-context';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Параметры создания выписки". */
export const useCreationParams = (): [string[], ICheckboxOption[]] => {
  const { withSign, onlyRequestsStatement } = useContext(FormContext);
  const { batch, change, getState } = useForm<IFormState>();
  const formState = getState();
  const { values } = formState;

  const options = useRef<ICheckboxOption[]>([]);
  const value = useRef<string[]>(values.creationParams);

  useEffect(() => {
    const hasMoreThenOneAccounts = values.accountIds.length > 1;
    const isPdf = values.fileFormat === FORMAT.PDF;

    if (withSign) {
      const params = values.documentsSetParams;

      params.push(DOCUMENTS_SET_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      change(FORM_FIELDS.DOCUMENTS_SET_PARAMS, params);
    }

    if (hasMoreThenOneAccounts && !value.current.includes(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES)) {
      value.current.push(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES);
    }

    options.current = defaultCreationParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      switch (x.value) {
        case CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES:
          acc.push({ ...x, disabled: !hasMoreThenOneAccounts });
          break;
        case CREATION_PARAMS.WITH_DOCUMENTS_SET: {
          if (isPdf) {
            acc.push({ ...x, disabled: withSign });
          }

          break;
        }
        case CREATION_PARAMS.WITH_SIGN: {
          if (isPdf) {
            acc.push(x);
          }

          break;
        }
        default: {
          acc.push(x);
        }
      }

      return acc;
    }, []);
  }, [change, values.accountIds.length, values.documentsSetParams, values.fileFormat, withSign]);

  useEffect(() => {
    if (onlyRequestsStatement) {
      batch(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_STATEMENTS, CREDIT_PARAMS.INCLUDE_ORDERS]);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_STATEMENTS, DEBIT_PARAMS.INCLUDE_ORDERS]);
      });
    }
  }, [batch, change, onlyRequestsStatement]);

  return [value.current, options.current];
};
