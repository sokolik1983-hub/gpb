import React, { useCallback } from 'react';
import { createStatement, getExecutor } from 'actions/client';
import { ForbiddenContent } from 'components';
import { Accounts } from 'components/form/accounts';
import { CreationParams } from 'components/form/creation-params';
import { DetailDocumentsParams } from 'components/form/detail-documents-params';
import { FileFormats } from 'components/form/file-formats';
import { Operations } from 'components/form/operations';
import { Period } from 'components/form/period';
import { useCreationType } from 'hooks/use-creation-type';
import { useInitialStatementRequest } from 'hooks/use-initial-statement-request';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import type { ExternalStatementRequest } from 'interfaces/form';
import { Footer } from 'pages/form/client/components/footer';
import { FormProvider } from 'pages/form/client/form-provider';
import { Form } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELD_LABELS, getInitialFormState } from 'stream-constants/form';
import { mapFormToDto } from 'utils';
import { NotFoundContent } from '@platform/services';
import { Box, DATA_TYPE, FormValidation, LoaderOverlay, Pattern } from '@platform/ui';
import { validateForm } from '../views/validate-form';
import css from './styles.scss';

/** ЭФ создания запроса на выписку. */
export const CreateStatementForm: React.FC = () => {
  const { state } = useLocation<ExternalStatementRequest>();

  const creationType = useCreationType();
  const executor = getExecutor();

  const submit = useCallback(
    (values: IFormState) => {
      const dto = mapFormToDto(values, creationType);

      void executor.execute(createStatement(EXPORT_PARAMS_USE_CASES.SIXTEEN), [dto]);
    },
    [creationType, executor]
  );

  const { initialStatementRequest: latestStatementRequest, isInitialLoading, isInitialError, isForbidden } = useInitialStatementRequest();

  if (isInitialLoading) {
    return <LoaderOverlay opened data-type={DATA_TYPE.LOADER_LOCAL} />;
  }

  if (isForbidden) {
    return <ForbiddenContent />;
  }

  if (isInitialError) {
    return <NotFoundContent />;
  }

  const initialFormState = getInitialFormState({ latestStatement: latestStatementRequest, prefilledFormValues: state?.formValues });

  return (
    <Box className={css.form} fill={'FAINT'}>
      <Form
        initialValues={initialFormState}
        render={({ handleSubmit }) => (
          <FormProvider onSubmit={handleSubmit}>
            <Pattern gap={'XL'}>
              <Pattern.Span size={9}>
                <Period />
                <Accounts />
                <Operations />
                <FileFormats />
                <CreationParams />
                <DetailDocumentsParams />
                <Footer />
              </Pattern.Span>
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
