import React, { useCallback } from 'react';
import { ScheduleCreationParams } from 'components/client/form/schedule-creation-params';
import { DetailDocumentsParams } from 'components/common/form/detail-documents-params';
import { FileFormats } from 'components/common/form/file-formats';
import { Operations } from 'components/common/form/operations';
import { Accounts, Emails, Organizations, ScheduleChannel, ScheduleFooter, SchedulePeriod, Time } from 'pages/form/client/components';
import { FormProvider } from 'pages/form/client/form-provider';
import { validateScheduleForm } from 'pages/form/client/views/validate-form';
import { Form } from 'react-final-form';
import type { IFormScheduleState } from 'stream-constants/client/form-schedule-state';
import { defaultFormState, FORM_FIELD_LABELS } from 'stream-constants/form/schedule-form-state';
import { asyncNoop } from 'utils/common';
import { Box, FormValidation, Pattern } from '@platform/ui';
import css from './styles.scss';

/** Параметры для значений handleSubmit и values формы ScheduleStatementForm. */
interface IScheduleFormValues {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  values: IFormScheduleState;
}

/** ЭФ создания запроса на выписку по расписанию. */
export const ScheduleStatementForm = () => {
  const submit = useCallback(() => asyncNoop(), []);

  return (
    <Box className={css.form} fill={'FAINT'}>
      <Form
        initialValues={defaultFormState}
        render={({ handleSubmit, values }: IScheduleFormValues) => (
          <FormProvider onSubmit={handleSubmit}>
            <Pattern gap={'XL'}>
              <Pattern.Span size={9}>
                <SchedulePeriod />
                <Time />
                <Organizations />
                <Accounts />
                <Operations />
                <FileFormats />
                <ScheduleCreationParams />
                <DetailDocumentsParams />
                <ScheduleChannel />
                {values.method === 'EMAIL' ? <Emails /> : (values.email = [])}
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
