import React from 'react';
import { useLatestStatement } from 'hooks';
import { locale } from 'localization';
import { Accounts } from 'pages/form/client/components/accounts';
import { CreationParams } from 'pages/form/client/components/creation-params';
import { Dates } from 'pages/form/client/components/dates';
import { DocumentsSetParams } from 'pages/form/client/components/documents-set-params';
import { Email } from 'pages/form/client/components/email';
import { FileFormats } from 'pages/form/client/components/file-formats';
import { Footer } from 'pages/form/client/components/footer';
import { Operations } from 'pages/form/client/components/operations';
import { PeriodType } from 'pages/form/client/components/period-type';
import { Row } from 'pages/form/client/components/row';
import { getDefaultFormState } from 'pages/form/client/interfaces/form-state';
import { Form } from 'react-final-form';
import { asyncNoop, noop } from 'utils';
import { Box, Gap } from '@platform/ui';
import css from './styles.scss';

export const NewForm: React.FC = () => {
  const onOk = noop;
  const validate = asyncNoop;

  const { latestStatement } = useLatestStatement();
  const defaultFormState = getDefaultFormState(latestStatement);

  return (
    <Box className={css.form}>
      <>
        <Form
          initialValues={defaultFormState}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Row label={locale.common.period.label}>
                <PeriodType />
                <Gap />
                <Dates />
              </Row>
              <Row label={locale.common.accounts.label}>
                <Accounts />
              </Row>
              <Row label={locale.common.fileFormat.label}>
                <FileFormats />
              </Row>
              <Row label={locale.common.operations.label}>
                <Operations />
              </Row>
              <Row label={locale.common.creationParams.label}>
                <CreationParams />
              </Row>
              <DocumentsSetParams />
              <Row label={locale.common.email.label}>
                <Email />
              </Row>
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
