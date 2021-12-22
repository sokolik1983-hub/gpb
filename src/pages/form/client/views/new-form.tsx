import React from 'react';
import { createStatement, getExecutor } from 'actions/client';
import { useLatestStatement } from 'hooks/use-latest-statement';
import type { IRequestStatementDto } from 'interfaces/client';
import { ACTIONS } from 'interfaces/client/classificators/actions';
import { CREATION_TYPE } from 'interfaces/client/classificators/creation-type';
import { TYPE } from 'interfaces/client/classificators/type';
import { Accounts } from 'pages/form/client/components/accounts';
import { CreationParams } from 'pages/form/client/components/creation-params';
import { DocumentsSetParams } from 'pages/form/client/components/documents-set-params';
import { Email } from 'pages/form/client/components/email';
import { FileFormats } from 'pages/form/client/components/file-formats';
import { Footer } from 'pages/form/client/components/footer';
import { Operations } from 'pages/form/client/components/operations';
import { Period } from 'pages/form/client/components/period';
import { FormProvider } from 'pages/form/client/form-provider';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { getInitialFormState } from 'pages/form/client/interfaces/form-state';
import { Form } from 'react-final-form';
import { asyncNoop } from 'utils';
import { Box, LoaderOverlay } from '@platform/ui';
import css from './styles.scss';

const mapFormToDto = (values: IFormState): IRequestStatementDto => ({
  accountsIds: values.accountIds,
  action: ACTIONS.VIEW,
  creationParams: {
    includeCreditOrders: false,
    includeCreditStatements: false,
    includeDebitOrders: false,
    includeDebitStatements: false,
    separateDocumentsFiles: false,
  },
  creationType: CREATION_TYPE.NEW,
  dateFrom: values.dateFrom,
  dateTo: values.dateTo,
  email: values.email,
  operations: values.operation,
  periodType: values.periodType,
  format: values.fileFormat,
  hideEmptyTurnovers: false,
  separateAccountsFiles: false,
  sign: false,
  sourcePage: '/statement/new',
  type: TYPE.ONETIME,
});

export const NewForm: React.FC = () => {
  const validate = asyncNoop;

  const { latestStatement, isLoading } = useLatestStatement();

  if (isLoading) {
    return <LoaderOverlay opened />;
  }

  const defaultFormState = getInitialFormState(latestStatement);

  const executor = getExecutor();
  const executeCreateStatementAction = (values: IFormState) => {
    void executor.execute(createStatement, [mapFormToDto(values)]);
  };

  return (
    <Box className={css.form} fill={'FAINT'}>
      <Form
        initialValues={defaultFormState}
        render={({ handleSubmit }) => (
          <FormProvider onSubmit={handleSubmit}>
            <Period />
            <Accounts />
            <Operations />
            <FileFormats />
            <CreationParams />
            <DocumentsSetParams />
            <Email />
            <Footer />
          </FormProvider>
        )}
        validate={validate}
        onSubmit={executeCreateStatementAction}
      />
    </Box>
  );
};

NewForm.displayName = 'NewForm';
