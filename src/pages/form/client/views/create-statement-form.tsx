import React, { useCallback } from 'react';
import { createStatement, getExecutor } from 'actions/client';
import { Accounts } from 'components/form/accounts';
import { CreationParams } from 'components/form/creation-params';
import { DetailDocumentsParams } from 'components/form/detail-documents-params';
import { FileFormats } from 'components/form/file-formats';
import { Operations } from 'components/form/operations';
import { Period } from 'components/form/period';
import { useCreationType } from 'hooks';
import { useInitialStatementRequest } from 'hooks/use-initial-statement-request';
import type { IFormState } from 'interfaces/form/form-state';
import { FORM_FIELD_LABELS, getInitialFormState } from 'interfaces/form/form-state';
import { Footer } from 'pages/form/client/components/footer';
import { FormProvider } from 'pages/form/client/form-provider';
import { Form } from 'react-final-form';
import { mapFormToDto } from 'utils';
import { NotFoundContent } from '@platform/services';
import { Box, LoaderOverlay, Pattern, FormValidation, DATA_TYPE } from '@platform/ui';
import { validateForm } from '../views/validate-form';
import css from './styles.scss';

/** ЭФ создания запроса на выписку. */
export const CreateStatementForm: React.FC = () => {
  const creationType = useCreationType();

  const executor = getExecutor();

  const submit = useCallback(
    (values: IFormState) => {
      const dto = mapFormToDto(values, creationType);

      void executor.execute(createStatement, [dto]);
    },
    [creationType, executor]
  );

  const { initialStatementRequest, isInitialLoading, isInitialError } = useInitialStatementRequest();

  if (isInitialLoading) {
    return <LoaderOverlay opened data-type={DATA_TYPE.LOADER_LOCAL} />;
  }

  if (isInitialError) {
    return <NotFoundContent />;
  }

  const initialFormState = getInitialFormState(initialStatementRequest);

  return (
    <Box className={css.form} fill={'FAINT'}>
      <Form
        initialValues={initialFormState}
        render={({ handleSubmit }) => (
          <FormProvider onSubmit={handleSubmit}>
            <Pattern>
              <Pattern.Span size={8}>
                <Period />
                <Accounts />
                <Operations />
                <FileFormats />
                <CreationParams />
                <DetailDocumentsParams />
                <Footer />
              </Pattern.Span>
              <Pattern.Span size={1} />
              <Pattern.Span size={3}>
                <FormValidation fieldLabels={FORM_FIELD_LABELS} />
              </Pattern.Span>
            </Pattern>
          </FormProvider>
        )}
        validate={validateForm}
        onSubmit={submit}
      />
    </Box>
  );
};

CreateStatementForm.displayName = 'CreateStatementForm';
