import { useContext, useEffect, useState } from 'react';
import { useWithPdfEsign } from 'components/common/form/common/use-with-pdf-esign';
import { FORMAT } from 'interfaces/common';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { useForm, useFormState } from 'react-final-form';
import { statementService } from 'services/admin';
import type { IFormState } from 'stream-constants/form';
import { CREDIT_PARAMS, DEBIT_PARAMS, FORM_FIELDS, FormContext } from 'stream-constants/form';
import { withDocumentsSetCases } from 'utils/admin';
import { alwaysSendParamCasesFromUI, getHideEsignCases, getHideSeparateAccountFilesCases } from 'utils/admin/export-params-dialog';
import { defaultCreationParamsOptions, isNeedTotalsOfDay } from 'utils/common';
import type { ICheckboxOption } from '@platform/ui';

/** Хук с бизнес-логикой для компонента "Параметры создания выписки". */
export const useCreationParams = (): [ICheckboxOption[]] => {
  const { withSign, withDocumentsSet, onlyRequestsStatement, isPdf, useCase, action, hasForeignCurrency, hasAccounts } = useContext(
    FormContext
  );
  const { batch, change } = useForm();
  const { values } = useFormState<IFormState>();

  const [options, setOptions] = useState<ICheckboxOption[]>([]);
  const [withPdfEsignOption] = useWithPdfEsign(statementService.hasClosedDay);

  useEffect(() => {
    const hasMoreThenOneAccounts = values.accountIds.length > 1;

    if (withSign) {
      change(FORM_FIELDS.DOCUMENTS_SET_PARAMS, []);
    }

    const newOptions = defaultCreationParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      switch (x.value) {
        case CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES:
          if ((!useCase || (useCase && !getHideSeparateAccountFilesCases(action!).includes(useCase))) && hasMoreThenOneAccounts) {
            if (values.format === FORMAT.EXCEL || values.format === FORMAT.TXT) {
              acc.push({ ...x, disabled: true });
            } else {
              acc.push(x);
            }
          }

          break;
        case CREATION_PARAMS.WITH_DOCUMENTS_SET: {
          if (isPdf && (!useCase || (useCase && withDocumentsSetCases.includes(useCase)))) {
            if (withSign) {
              acc.push({ ...x, disabled: false });
            } else {
              acc.push(x);
            }
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
          acc.push(x);

          break;
        }
        case CREATION_PARAMS.TOTALS_OF_DAY: {
          const hasDateRange = !!values.dateFrom && !!values.dateTo;
          const hasTotalsOfDay = options.some(({ value }) => value === CREATION_PARAMS.TOTALS_OF_DAY);

          if ((hasDateRange && isNeedTotalsOfDay(values)) || (!hasDateRange && hasTotalsOfDay)) {
            acc.push(x);
          }

          break;
        }
        case CREATION_PARAMS.REVALUATION_ACCOUNTING_ENTRY: {
          if (hasForeignCurrency && hasAccounts) {
            acc.push(x);
          }

          break;
        }
        case CREATION_PARAMS.NATIONAL_CURRENCY: {
          if (hasForeignCurrency && hasAccounts && values.format !== FORMAT.C1 && values.format !== FORMAT.TXT) {
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
