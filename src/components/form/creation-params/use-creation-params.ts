import { useContext, useEffect, useState } from 'react';
import {
  creationParamsShowCases,
  esignCheckboxShowCases,
  hideEmptyTurnoversCheckboxShowCases,
} from 'components/export-params-dialog/utils';
import { CREATION_PARAMS, getDefaultCreationParamsOptions } from 'interfaces/form/creation-params';
import { CREDIT_PARAMS } from 'interfaces/form/credit-params';
import { DEBIT_PARAMS } from 'interfaces/form/debit-params';
import { FormContext } from 'interfaces/form/form-context';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import type { IFormState } from 'interfaces/form/form-state';
import { useForm, useFormState } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Параметры создания выписки". */
export const useCreationParams = (): [ICheckboxOption[]] => {
  const { withSign, onlyRequestsStatement, useCase, isPdf } = useContext(FormContext);
  const { batch, change } = useForm();
  const { values } = useFormState<IFormState>();

  const [options, setOptions] = useState<ICheckboxOption[]>([]);

  const isHideEmptyTurnoversCheckboxShow = hideEmptyTurnoversCheckboxShowCases.includes(useCase!);
  const withEsignCheckboxShow = esignCheckboxShowCases.includes(useCase!);
  const withDocumentsSetCheckboxShow = creationParamsShowCases.includes(useCase!);

  useEffect(() => {
    const hasMoreThenOneAccounts = values.accountIds.length > 1;

    if (withSign) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      change(FORM_FIELDS.DOCUMENTS_SET_PARAMS, []);
    }

    const defaultCreationParamsOptions = getDefaultCreationParamsOptions(useCase);

    const newOptions = defaultCreationParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      switch (x.value) {
        case CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES:
          if (!useCase) {
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
          if (isPdf && (!useCase || (useCase && withEsignCheckboxShow))) {
            acc.push(x);
          }

          break;
        }
        case CREATION_PARAMS.HIDE_EMPTY_TURNOVERS: {
          if (!useCase || (useCase && isHideEmptyTurnoversCheckboxShow)) {
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
  }, [
    change,
    isHideEmptyTurnoversCheckboxShow,
    isPdf,
    useCase,
    values.accountIds.length,
    withDocumentsSetCheckboxShow,
    withEsignCheckboxShow,
    withSign,
  ]);

  useEffect(() => {
    if (withSign) {
      batch(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_STATEMENTS, CREDIT_PARAMS.INCLUDE_ORDERS]);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_STATEMENTS, DEBIT_PARAMS.INCLUDE_ORDERS]);
      });
    } else if (onlyRequestsStatement) {
      batch(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_STATEMENTS]);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_STATEMENTS]);
      });
    } else if (!onlyRequestsStatement && !withSign) {
      batch(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_ORDERS]);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_ORDERS]);
      });
    }
  }, [batch, change, onlyRequestsStatement, withSign]);

  return [options];
};
