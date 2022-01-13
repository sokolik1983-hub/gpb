import React from 'react';
import { createStatement, getExecutor } from 'actions/client';
import { useCreationType } from 'hooks';
import { useInitialStatementRequest } from 'hooks/use-initial-statement-request';
import type { ICreateRequestStatementDto } from 'interfaces/client';
import { ACTIONS } from 'interfaces/client/classificators/actions';
import { CREATION_TYPE } from 'interfaces/client/classificators/creation-type';
import { TYPE } from 'interfaces/client/classificators/type';
import { Accounts } from 'pages/form/client/components/accounts';
import { CreationParams } from 'pages/form/client/components/creation-params';
import { DocumentsSetParams } from 'pages/form/client/components/documents-set-params';
import { FileFormats } from 'pages/form/client/components/file-formats';
import { Footer } from 'pages/form/client/components/footer';
import { Operations } from 'pages/form/client/components/operations';
import { Period } from 'pages/form/client/components/period';
import { FormProvider } from 'pages/form/client/form-provider';
import { CREATION_PARAMS } from 'pages/form/client/interfaces/creation-params';
import { CREDIT_PARAMS } from 'pages/form/client/interfaces/credit-params';
import { DEBIT_PARAMS } from 'pages/form/client/interfaces/debit-params';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { FORM_FIELD_LABELS, getInitialFormState } from 'pages/form/client/interfaces/form-state';
import { Form } from 'react-final-form';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { NotFoundContent } from '@platform/services';
import { Box, LoaderOverlay, Pattern, FormValidation } from '@platform/ui';
import { validateForm } from '../views/validate-form';
import css from './styles.scss';

/** Функция для преобразования значений формы в ДТО запроса выписки. */
const mapFormToDto = (values: IFormState, creationType = CREATION_TYPE.NEW): ICreateRequestStatementDto => ({
  accountsIds: values.accountIds,
  action: ACTIONS.VIEW,
  creationParams: {
    includeCreditOrders: values.creditParams.includes(CREDIT_PARAMS.INCLUDE_ORDERS),
    includeCreditStatements: values.creditParams.includes(CREDIT_PARAMS.INCLUDE_STATEMENTS),
    includeDebitOrders: values.creditParams.includes(DEBIT_PARAMS.INCLUDE_ORDERS),
    includeDebitStatements: values.creditParams.includes(DEBIT_PARAMS.INCLUDE_STATEMENTS),
    separateDocumentsFiles: values.creationParams.includes(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES),
  },
  creationType,
  dateFrom: values.dateFrom,
  dateTo: values.dateTo,
  email: values.email,
  operations: values.operation,
  periodType: values.periodType,
  format: values.fileFormat,
  hideEmptyTurnovers: values.creationParams.includes(CREATION_PARAMS.HIDE_EMPTY_TURNOVERS),
  separateAccountsFiles: values.creationParams.includes(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES),
  sign: values.creationParams.includes(CREATION_PARAMS.WITH_SIGN),
  sourcePage: COMMON_STREAM_URL.STATEMENT,
  type: TYPE.ONETIME,
});

/** ЭФ создания запроса на выписку. */
export const NewForm: React.FC = () => {
  const creationType = useCreationType();

  const { initialStatementRequest, isInitialLoading, isInitialError } = useInitialStatementRequest();

  if (isInitialLoading) {
    return <LoaderOverlay opened />;
  }

  if (isInitialError) {
    return <NotFoundContent />;
  }

  const initialFormState = getInitialFormState(initialStatementRequest);

  const executor = getExecutor();
  const executeCreateStatementAction = (values: IFormState) => {
    void executor.execute(createStatement, [mapFormToDto(values, creationType)]);
  };

  return (
    <Box className={css.form} fill={'FAINT'}>
      <Form
        initialValues={initialFormState}
        render={({ handleSubmit }) => (
          <FormProvider onSubmit={handleSubmit}>
            <Pattern>
              <Pattern.Span size={7}>
                <Period />
                <Accounts />
                <Operations />
                <FileFormats />
                <CreationParams />
                <DocumentsSetParams />
                <Footer />
              </Pattern.Span>
              <Pattern.Span size={2} />
              <Pattern.Span size={3}>
                <FormValidation fieldLabels={FORM_FIELD_LABELS} />
              </Pattern.Span>
            </Pattern>
          </FormProvider>
        )}
        validate={validateForm}
        onSubmit={executeCreateStatementAction}
      />
    </Box>
  );
};

NewForm.displayName = 'NewForm';
