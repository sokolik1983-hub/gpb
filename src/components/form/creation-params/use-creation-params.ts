import { useContext, useEffect, useState } from 'react';
import { useNationalCurrency } from 'components/form/common/use-national-currency';
import { useNationalCurrencyAndRevaluationAccount } from 'components/form/common/use-national-currency-and-revaluation-account';
import { useRevaluationAccount } from 'components/form/common/use-revaluation-account';
import { useWithPdfEsign } from 'components/form/common/use-with-pdf-esign';
import { Decorator } from 'final-form';
import { FORMAT } from 'interfaces/client';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { useForm, useFormState } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { CREDIT_PARAMS, DEBIT_PARAMS, FORM_FIELDS, FormContext } from 'stream-constants/form';
import { defaultCreationParamsOptions, isNeedTotalsOfDay } from 'utils';
import {
  alwaysSendParamCasesFromUI,
  getHideEsignCases,
  getHideSeparateAccountFilesCases,
  withDocumentsSetCases,
} from 'utils/export-params-dialog';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Параметры создания выписки". */
export const useCreationParams = (): [ICheckboxOption[]] => {
  const { withSign, withDocumentsSet, onlyRequestsStatement, isPdf, useCase, action, hasForeignCurrency } = useContext(FormContext);
  const { batch, change } = useForm();
  const { values } = useFormState<IFormState>();

  const [options, setOptions] = useState<ICheckboxOption[]>([]);
  const [withPdfEsignOption] = useWithPdfEsign();

  useRevaluationAccount();
  useNationalCurrency();
  // useNationalCurrencyAndRevaluationAccount();

  useEffect(() => {
    const hasMoreThenOneAccounts = values.accountIds.length > 1;

    if (withSign) {
      change(FORM_FIELDS.DOCUMENTS_SET_PARAMS, []);
    }

    const newOptions = defaultCreationParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      switch (x.value) {
        case CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES:
          if (!useCase || (useCase && !getHideSeparateAccountFilesCases(action!).includes(useCase))) {
            const disabled = !hasMoreThenOneAccounts || values.format === FORMAT.EXCEL || values.format === FORMAT.TXT;

            acc.push({ ...x, disabled });
          }

          break;
        case CREATION_PARAMS.WITH_DOCUMENTS_SET: {
          if (isPdf && (!useCase || (useCase && withDocumentsSetCases.includes(useCase)))) {
            acc.push({ ...x, disabled: withSign });
          }

          break;
        }
        case CREATION_PARAMS.WITH_PDF_SIGN: {
          if (isPdf && (!useCase || (useCase && !getHideEsignCases(action!).includes(useCase)))) {
            acc.push(withPdfEsignOption);
          }

          break;
        }
        case CREATION_PARAMS.HIDE_EMPTY_TURNOVERS: {
          acc.push({ ...x, disabled: withSign });

          break;
        }
        case CREATION_PARAMS.TOTALS_OF_DAY: {
          const validDateRange = Boolean(values.dateFrom && values.dateTo);
          const show = options.some(({ value }) => value === CREATION_PARAMS.TOTALS_OF_DAY);

          if ((validDateRange && isNeedTotalsOfDay(values)) || (!validDateRange && show)) {
            acc.push(x);
          }

          break;
        }
        case CREATION_PARAMS.REVALUATION_ACCOUNT_ENTRY: {
          acc.push({ ...x, disabled: !hasForeignCurrency });

          break;
        }
        case CREATION_PARAMS.NATIONAL_CURRENCY: {
          acc.push({ ...x, disabled: !hasForeignCurrency || values.format === FORMAT.C1 || values.format === FORMAT.TXT });

          break;
        }
        default: {
          acc.push(x);
        }
      }

      return acc;
    }, []);

    setOptions(newOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasForeignCurrency,
    action,
    change,
    isPdf,
    useCase,
    values.accountIds.length,
    values.dateFrom,
    values.dateTo,
    values.format,
    withSign,
    withPdfEsignOption.disabled,
  ]);

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
