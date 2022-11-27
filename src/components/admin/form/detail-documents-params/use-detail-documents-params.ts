import { useContext, useEffect, useRef } from 'react';
import { useForm, useFormState } from 'react-final-form';
import { CREDIT_PARAMS, DEBIT_PARAMS, FORM_FIELDS, FormContext } from 'stream-constants/form';
import type { IFormState } from 'stream-constants/form';
import { defaultDocumentsSetParamsOptions } from 'stream-constants/form/default-documents-set-params-options';
import type { ICheckboxOption } from '@platform/ui';

/**
 * Хук с бизнес-логикой для компонента "Детальные параметры комплекта документов".
 *
 * @param withEntriesList Выписка экспортируется со списком проводок.
 * */
export const useDetailDocumentsParams = (withEntriesList: boolean): [ICheckboxOption[]] => {
  const { onlyRequestsStatement } = useContext(FormContext);
  const { batch, change } = useForm();
  const { values } = useFormState<IFormState>();

  const options = useRef<ICheckboxOption[]>([]);

  useEffect(() => {
    if (withEntriesList) {
      if (onlyRequestsStatement) {
        batch(() => {
          change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_STATEMENTS]);
          change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_STATEMENTS]);
        });
        // по исправлениям в https://confluence.gboteam.ru/pages/viewpage.action?pageId=34441172
      } else if (withEntriesList) {
        batch(() => {
          change(FORM_FIELDS.CREDIT_PARAMS, [CREDIT_PARAMS.INCLUDE_STATEMENTS, CREDIT_PARAMS.INCLUDE_ORDERS]);
          change(FORM_FIELDS.DEBIT_PARAMS, [DEBIT_PARAMS.INCLUDE_STATEMENTS, DEBIT_PARAMS.INCLUDE_ORDERS]);
        });
      } else {
        change(FORM_FIELDS.CREDIT_PARAMS, []);
        change(FORM_FIELDS.DEBIT_PARAMS, []);
      }
    }
  }, [batch, change, onlyRequestsStatement, withEntriesList]);

  useEffect(() => {
    options.current = defaultDocumentsSetParamsOptions;
  }, [values.creationParams]);

  return [options.current];
};
