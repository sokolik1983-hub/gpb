import type { FC } from 'react';
import React, { useCallback } from 'react';
import { createStatement, executor, viewStatementHistoryScroller } from 'actions/admin';
import { FormPageLayout } from 'components/admin';
import type { StatementRequestFormValues } from 'interfaces/admin/form/form-state';
import { locale } from 'localization';
import { defaultFormState } from 'pages/form/admin/views/statement-request/constants';
import { RequestForm } from 'pages/form/admin/views/statement-request/request-form';
import { validateForm } from 'pages/form/admin/views/statement-request/validation';
import { Form } from 'react-final-form';
import { mapFormToDto } from 'utils/admin';

/**
 * [Выписки_ЗВ] ЭФ Банка "Запрос выписки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32247821
 */
export const StatementRequest: FC = () => {
  /** Обработчик перехода к запросам выписки. */
  const handleToStatementRequests = useCallback(() => {
    void executor.execute(viewStatementHistoryScroller);
  }, []);

  /** Обработчик отправки формы. */
  const handleSubmitForm = useCallback((values: StatementRequestFormValues) => {
    const dto = mapFormToDto(values);

    void executor.execute(createStatement, [dto]);
  }, []);

  return (
    <FormPageLayout
      backButtonTitle={locale.admin.button.toStatementRequests}
      header={locale.admin.statementRequestForm.pageTitle}
      onBack={handleToStatementRequests}
    >
      <Form
        initialValues={defaultFormState}
        render={({ handleSubmit }) => <RequestForm onSubmit={handleSubmit} />}
        validate={validateForm}
        onSubmit={handleSubmitForm}
      />
    </FormPageLayout>
  );
};

StatementRequest.displayName = 'StatementRequestForm';
