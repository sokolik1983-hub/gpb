import React from 'react';
import { useLatestStatement } from 'hooks';
import { Accounts } from 'pages/form/client/components/accounts';
import { CreationParams } from 'pages/form/client/components/creation-params';
import { DocumentsSetParams } from 'pages/form/client/components/documents-set-params';
import { Email } from 'pages/form/client/components/email';
import { FileFormats } from 'pages/form/client/components/file-formats';
import { Footer } from 'pages/form/client/components/footer';
import { Operations } from 'pages/form/client/components/operations';
import { Period } from 'pages/form/client/components/period';
import { getInitialFormState } from 'pages/form/client/interfaces/form-state';
import { Form } from 'react-final-form';
import { asyncNoop, noop } from 'utils';
import { Box } from '@platform/ui';
import css from './styles.scss';

export const NewForm: React.FC = () => {
  const onOk = noop;
  const validate = asyncNoop;

  const { latestStatement } = useLatestStatement();
  const defaultFormState = getInitialFormState(latestStatement);

  return (
    <Box className={css.form} fill={'FAINT'}>
      <>
        <Form
          initialValues={defaultFormState}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Period />
              <Accounts />
              <FileFormats />
              <Operations />
              <CreationParams />
              <DocumentsSetParams />
              <Email />
            </form>
          )}
          validate={validate}
          onSubmit={onOk}
        />
        <Footer />
      </>
    </Box>
  );
};

NewForm.displayName = 'NewForm';
