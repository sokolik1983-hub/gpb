import React from 'react';
import { createStatement, getExecutor } from 'actions/client';
import { Accounts } from 'components/form/accounts';
import { CreationParams } from 'components/form/creation-params';
import { DetailDocumentsParams } from 'components/form/detail-documents-params';
import { FileFormats } from 'components/form/file-formats';
import { Operations } from 'components/form/operations';
import { Period } from 'components/form/period';
import { useCreationType } from 'hooks';
import { useInitialStatementRequest } from 'hooks/use-initial-statement-request';
import type { ICreateRequestStatementDto } from 'interfaces/client';
import { CREATION_TYPE } from 'interfaces/client/classificators/creation-type';
import { TYPE } from 'interfaces/client/classificators/type';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { CREDIT_PARAMS } from 'interfaces/form/credit-params';
import { DEBIT_PARAMS } from 'interfaces/form/debit-params';
import { DETAIL_DOCUMENT_PARAMS } from 'interfaces/form/detail-document-params';
import type { IFormState } from 'interfaces/form/form-state';
import { FORM_FIELD_LABELS, getInitialFormState } from 'interfaces/form/form-state';
import { Footer } from 'pages/form/client/components/footer';
import { FormProvider } from 'pages/form/client/form-provider';
import { Form } from 'react-final-form';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { NotFoundContent } from '@platform/services';
import { Box, LoaderOverlay, Pattern, FormValidation } from '@platform/ui';
import { validateForm } from '../views/validate-form';
import css from './styles.scss';

/** Функция для преобразования значений формы в ДТО запроса выписки. */
const mapFormToDto = (values: IFormState, creationType = CREATION_TYPE.NEW): ICreateRequestStatementDto => ({
  accountsIds: values.accountIds,
  action: values.action!,
  creationParams: {
    includeCreditOrders: values.creditParams.includes(CREDIT_PARAMS.INCLUDE_ORDERS),
    includeCreditStatements: values.creditParams.includes(CREDIT_PARAMS.INCLUDE_STATEMENTS),
    includeDebitOrders: values.creditParams.includes(DEBIT_PARAMS.INCLUDE_ORDERS),
    includeDebitStatements: values.creditParams.includes(DEBIT_PARAMS.INCLUDE_STATEMENTS),
    separateDocumentsFiles: values.documentsSetParams.includes(DETAIL_DOCUMENT_PARAMS.SEPARATE_DOCUMENTS_FILES),
  },
  creationType,
  dateFrom: values.dateFrom,
  dateTo: values.dateTo,
  email: values.email,
  operations: values.operations,
  periodType: values.periodType,
  format: values.format,
  hideEmptyTurnovers: values.creationParams.includes(CREATION_PARAMS.HIDE_EMPTY_TURNOVERS),
  separateAccountsFiles: values.creationParams.includes(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES),
  sign: values.creationParams.includes(CREATION_PARAMS.WITH_SIGN),
  sourcePage: COMMON_STREAM_URL.STATEMENT,
  type: TYPE.ONETIME,
});

/** ЭФ создания запроса на выписку. */
export const CreateStatementForm: React.FC = () => {
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
    const dto = mapFormToDto(values, creationType);

    void executor.execute(createStatement, [dto]);
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
                <DetailDocumentsParams />
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

CreateStatementForm.displayName = 'CreateStatementForm';
