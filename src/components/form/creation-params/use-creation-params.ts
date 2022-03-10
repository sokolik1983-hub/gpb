import { useContext, useEffect, useState } from 'react';
import { CREATION_PARAMS, getDefaultCreationParamsOptions } from 'interfaces/form/creation-params';
import { CREDIT_PARAMS } from 'interfaces/form/credit-params';
import { DEBIT_PARAMS } from 'interfaces/form/debit-params';
import { FormContext } from 'interfaces/form/form-context';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import type { IFormState } from 'interfaces/form/form-state';
import { useForm, useFormState } from 'react-final-form';
import {
  creationParamsShowCases,
  getHideEmptyTurnoverCases,
  getHideEsignCases,
  getHideSeparateAccountFilesCases,
} from 'utils/export-params-dialog';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Параметры создания выписки". */
export const useCreationParams = (): [ICheckboxOption[]] => {
  const { withSign, withDocumentsSet, onlyRequestsStatement, useCase, isPdf } = useContext(FormContext);
  const { batch, change } = useForm();
  const { values } = useFormState<IFormState>();

  const [options, setOptions] = useState<ICheckboxOption[]>([]);

  const withDocumentsSetCheckboxShow = creationParamsShowCases.includes(useCase!);

  useEffect(() => {
    const hasMoreThenOneAccounts = values.accountIds.length > 1;

    if (withSign) {
      change(FORM_FIELDS.DOCUMENTS_SET_PARAMS, []);
    }

    const defaultCreationParamsOptions = getDefaultCreationParamsOptions(useCase);

    const newOptions = defaultCreationParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      switch (x.value) {
        case CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES:
          if (!useCase || (useCase && !getHideSeparateAccountFilesCases(values.action!))) {
            acc.push({ ...x, disabled: !hasMoreThenOneAccounts });
          }

          break;
        case CREATION_PARAMS.WITH_DOCUMENTS_SET: {
          if (isPdf && (!useCase || (useCase && withDocumentsSetCheckboxShow))) {
            acc.push({ ...x, disabled: withSign });
          }

          break;
        }
        case CREATION_PARAMS.WITH_SIGN: {
          if (isPdf && (!useCase || (useCase && !getHideEsignCases(values.action!).includes(useCase)))) {
            acc.push(x);
          }

          break;
        }
        case CREATION_PARAMS.HIDE_EMPTY_TURNOVERS: {
          if (!useCase || (useCase && !getHideEmptyTurnoverCases(values.action!))) {
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
  }, [change, isPdf, useCase, values.accountIds.length, values.action, withDocumentsSetCheckboxShow, withSign]);

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
        change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_ORDERS]);
        change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_ORDERS]);
      });
    }
  }, [batch, change, onlyRequestsStatement, withSign, withDocumentsSet]);

  return [options];
};
