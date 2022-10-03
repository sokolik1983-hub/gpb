import React from 'react';
import { CreationParams } from 'components/admin/form/creation-params';
import { ForbiddenContent } from 'components/common';
import { Accounts } from 'components/common/form/accounts';
import { DetailDocumentsParams } from 'components/common/form/detail-documents-params';
import { FileFormats } from 'components/common/form/file-formats';
import { Operations } from 'components/common/form/operations';
import { Period } from 'components/common/form/period';
import { useInitialStatementRequest } from 'hooks/admin';
import type { ExternalStatementRequest } from 'interfaces/form';
import { locale } from 'localization';
import { Footer } from 'pages/form/admin/components/footer';
import { FormProvider } from 'pages/form/admin/form-provider';
import { Form } from 'react-final-form';
import { useHistory, useLocation } from 'react-router-dom';
import { getInitialFormState } from 'stream-constants/admin/form';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELD_LABELS } from 'stream-constants/form';
import { asyncNoop } from 'utils/common';
import { NotFoundContent } from '@platform/services';
import { Box, ServiceIcons, DATA_TYPE, FormValidation, Link, LoaderOverlay, Pattern, Typography, Gap } from '@platform/ui';
import css from './styles.scss';

/** ЭФ создания запроса на выписку. */
export const CreateStatementForm: React.FC = () => {
  const { state } = useLocation<ExternalStatementRequest>();

  const prefilledFormValues: IFormState = state?.formValues || {};

  const { goBack } = useHistory();

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

  const initialFormState = getInitialFormState({ latestStatement: latestStatementRequest, prefilledFormValues });

  return (
    <Box className={css.form} fill={'FAINT'}>
      <Form
        initialValues={initialFormState}
        render={({ handleSubmit }) => (
          <FormProvider onSubmit={handleSubmit}>
            <Pattern gap={'XL'}>
              <Pattern.Span size={9}>
                <Link icon={ServiceIcons.ArrowLeftSimple} onClick={goBack}>
                  {locale.admin.form.buttons.back.label}
                </Link>
                <Typography.H2>{locale.admin.form.header}</Typography.H2>
                <Gap.LG />
                <Period disabled />
                <Accounts disabled />
                <Operations disabled />
                <FileFormats disabled />
                <CreationParams disabled />
                <DetailDocumentsParams disabled />
                <Footer />
              </Pattern.Span>
              <Pattern.Span size={3}>
                <FormValidation fieldLabels={FORM_FIELD_LABELS} />
              </Pattern.Span>
            </Pattern>
          </FormProvider>
        )}
        onSubmit={asyncNoop}
      />
    </Box>
  );
};

CreateStatementForm.displayName = 'CreateStatementForm';
