import React, { useCallback } from 'react';
import { createStatement, getExecutor } from 'actions/client';
import { CreationParams } from 'components/client/form/creation-params';
import { DetailDocumentsParams } from 'components/common/form/detail-documents-params';
import { FileFormats } from 'components/common/form/file-formats';
import { Operations } from 'components/common/form/operations';
import { useCreationType } from 'hooks/common';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { Accounts, Emails, Organizations, ScheduleChannel, ScheduleFooter, SchedulePeriod, Time } from 'pages/form/client/components';
import { FormProvider } from 'pages/form/client/form-provider';
import { validateScheduleForm } from 'pages/form/client/views/validate-form';
import { Form } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { defaultFormState, FORM_FIELD_LABELS } from 'stream-constants/form/schedule-form-state';
import { mapFormToDto } from 'utils/client';
import { Box, FormValidation, Pattern } from '@platform/ui';
import css from './styles.scss';

/** ЭФ создания запроса на выписку по расписанию. */
export const ScheduleStatementForm = () => {
  const creationType = useCreationType();
  const executor = getExecutor();

  const submit = useCallback(
    (values: IFormState) => {
      const dto = mapFormToDto(values, creationType);

      void executor.execute(createStatement(EXPORT_PARAMS_USE_CASES.SIXTEEN), [dto]);
    },
    [creationType, executor]
  );

  return (
    <Box className={css.form} fill={'FAINT'}>
      <Form
        initialValues={defaultFormState}
        render={({ handleSubmit }) => (
          <FormProvider onSubmit={handleSubmit}>
            <Pattern gap={'XL'}>
              <Pattern.Span size={9}>
                <SchedulePeriod />
                <Time />
                <Organizations />
                <Accounts />
                <Operations />
                <FileFormats />
                <CreationParams />
                <DetailDocumentsParams />
                <ScheduleChannel />
                <Emails />
                <ScheduleFooter />
              </Pattern.Span>
              <Pattern.Span size={3}>
                <FormValidation fieldLabels={FORM_FIELD_LABELS} />
              </Pattern.Span>
            </Pattern>
          </FormProvider>
        )}
        validate={validateScheduleForm}
        onSubmit={submit}
      />
    </Box>
  );
};
ScheduleStatementForm.displayName = 'ScheduleStatementForm';
