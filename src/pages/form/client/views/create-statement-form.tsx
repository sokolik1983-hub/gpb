import type { FC } from 'react';
import React, { useCallback, useMemo } from 'react';
import { createStatement, getExecutor } from 'actions/client';
import { ForbiddenContent } from 'components';
import { Accounts } from 'components/form/accounts';
import { CreationParams } from 'components/form/creation-params';
import { DetailDocumentsParams } from 'components/form/detail-documents-params';
import { FileFormats } from 'components/form/file-formats';
import { Operations } from 'components/form/operations';
import { Period } from 'components/form/period';
import { useAccounts, useCreationType } from 'hooks';
import { useInitialStatementRequest } from 'hooks/use-initial-statement-request';
import { Footer } from 'pages/form/client/components/footer';
import { FormProvider } from 'pages/form/client/form-provider';
import { Form, useFormState } from 'react-final-form';
import { RUB_CURRENCY } from 'stream-constants';
import { FORM_FIELD_LABELS, getInitialFormState } from 'stream-constants/form';
import type { IFormState } from 'stream-constants/form';
import { mapFormToDto } from 'utils';
import { NotFoundContent } from '@platform/services';
import { Box, LoaderOverlay, Pattern, FormValidation, DATA_TYPE } from '@platform/ui';
import { validateForm } from '../views/validate-form';
import css from './styles.scss';

const FormView: FC<{ handleSubmit(): void }> = ({ handleSubmit }) => {
  const { values } = useFormState<IFormState>();
  const { data: accounts } = useAccounts();

  const hasForeignCurrency = useMemo((): boolean => {
    const ids = new Set(values.accountIds);

    return accounts.filter(acc => ids.has(acc.id)).some(acc => acc.currency.code !== RUB_CURRENCY);
  }, [accounts, values.accountIds]);

  return (
    <FormProvider hasForeignCurrency={hasForeignCurrency} onSubmit={handleSubmit}>
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
  );
};

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

  const initialFormState = getInitialFormState({ latestStatement: latestStatementRequest });

  return (
    <Box className={css.form} fill={'FAINT'}>
      <Form
        initialValues={initialFormState}
        render={({ handleSubmit }) => <FormView handleSubmit={handleSubmit} />}
        validate={validateForm}
        onSubmit={submit}
      />
    </Box>
  );
};

CreateStatementForm.displayName = 'CreateStatementForm';
