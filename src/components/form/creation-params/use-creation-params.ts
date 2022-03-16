import { useContext, useEffect, useState } from 'react';
import { CREATION_PARAMS, getDefaultCreationParamsOptions } from 'interfaces/form/creation-params';
import { CREDIT_PARAMS } from 'interfaces/form/credit-params';
import { DEBIT_PARAMS } from 'interfaces/form/debit-params';
import { FormContext } from 'interfaces/form/form-context';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import type { IFormState } from 'interfaces/form/form-state';
import { useForm, useFormState } from 'react-final-form';
import {
  alwaysSendParamCasesFromUI,
  getHideEsignCases,
  getHideSeparateAccountFilesCases,
  withDocumentsSetCases,
} from 'utils/export-params-dialog';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Параметры создания выписки". */
export const useCreationParams = (): [ICheckboxOption[]] => {
  const { withSign, withDocumentsSet, onlyRequestsStatement, isPdf, useCase, action } = useContext(FormContext);
  const { batch, change } = useForm();
  const { values } = useFormState<IFormState>();

  const [options, setOptions] = useState<ICheckboxOption[]>([]);

  useEffect(() => {
    const hasMoreThenOneAccounts = values.accountIds.length > 1;

    if (withSign) {
      change(FORM_FIELDS.DOCUMENTS_SET_PARAMS, []);
    }

    const defaultCreationParamsOptions = getDefaultCreationParamsOptions(useCase);

    const newOptions = defaultCreationParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      switch (x.value) {
        case CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES:
          if (!useCase || (useCase && !getHideSeparateAccountFilesCases(action!).includes(useCase))) {
            acc.push({ ...x, disabled: !hasMoreThenOneAccounts });
          }

          break;
        case CREATION_PARAMS.WITH_DOCUMENTS_SET: {
          if (isPdf && (!useCase || (useCase && withDocumentsSetCases.includes(useCase)))) {
            acc.push({ ...x, disabled: withSign });
          }

          break;
        }
        case CREATION_PARAMS.WITH_SIGN: {
          if (isPdf && (!useCase || (useCase && !getHideEsignCases(action!).includes(useCase)))) {
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

    setOptions(newOptions);
  }, [action, change, isPdf, useCase, values.accountIds.length, withSign]);

  useEffect(() => {
    if (!withDocumentsSet) {
      return;
    }

    if (withSign) {
      batch(() => {
        change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_STATEMENTS, CREDIT_PARAMS.INCLUDE_ORDERS]);
        change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_STATEMENTS, DEBIT_PARAMS.INCLUDE_ORDERS]);
      });
    } else if (onlyRequestsStatement) {
      batch(() => {
        change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_STATEMENTS]);
        change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_STATEMENTS]);
      });
    } else if (!onlyRequestsStatement && !withSign) {
      batch(() => {
        if (useCase && alwaysSendParamCasesFromUI.includes(useCase)) {
          change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_STATEMENTS, CREDIT_PARAMS.INCLUDE_ORDERS]);
          change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_STATEMENTS, DEBIT_PARAMS.INCLUDE_ORDERS]);
        } else {
          change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_ORDERS]);
          change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_ORDERS]);
        }
      });
    }
  }, [batch, change, onlyRequestsStatement, useCase, withDocumentsSet, withSign]);

  return [options];
};
