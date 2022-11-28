import type { FC } from 'react';
import React, { useCallback, useMemo } from 'react';
import { executor, viewStatementHistoryScroller } from 'actions/admin';
import { FormPageLayout } from 'components/admin';
import { DetailDocumentsParams } from 'components/common/form/detail-documents-params';
import { FileFormats } from 'components/common/form/file-formats';
import { Operations } from 'components/common/form/operations';
import { Period } from 'components/common/form/period';
import { Row } from 'components/common/form/row';
import { useStatementRequestCard } from 'hooks/admin';
import type { ExtendedStatementRequestCard } from 'interfaces/admin';
import { locale } from 'localization';
import { FormProvider } from 'pages/form/admin/form-provider';
import { FORM_FIELDS, defaultFormState } from 'pages/form/admin/views/statement-request-card/constants';
import { Form } from 'react-final-form';
import { getInitialFormState } from 'stream-constants/admin/form';
import { asyncNoop } from 'utils/common';
import { NotFoundContent } from '@platform/services';
import type { IOption } from '@platform/ui';
import { Box, DATA_TYPE, Fields, LoaderOverlay, Pattern, RegularButton } from '@platform/ui';
import { ACTIONS } from '@platform/ui/dist-types/constants';
import css from '../styles.scss';
import { CreationParams } from './creation-params';

/** Свойства карточки запроса выписки. */
interface StatementRequestCardProps {
  /** Идентификатор выписки. */
  statementId: string;
}

/**
 * [Выписки_ЗВ] ЭФ Банка "Карточка запроса выписки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=77695293
 */
export const StatementRequestCard: FC<StatementRequestCardProps> = ({ statementId }) => {
  const { data: statementRequest, isLoading, isError } = useStatementRequestCard(statementId);

  const { accounts = [], organizations = [] } = (statementRequest ?? {}) as ExtendedStatementRequestCard;

  const accountOptions: IOption[] = useMemo(
    () =>
      accounts.map(({ id, number }) => ({
        label: number,
        value: id,
      })),
    [accounts]
  );

  const organizationsOptions: IOption[] = useMemo(
    () =>
      organizations.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [organizations]
  );

  /** Обработчик перехода к запросам выписки. */
  const handleToStatementRequests = useCallback(() => {
    void executor.execute(viewStatementHistoryScroller);
  }, []);

  if (isLoading) {
    return <LoaderOverlay opened data-type={DATA_TYPE.LOADER_LOCAL} />;
  }

  if (isError) {
    return <NotFoundContent />;
  }

  const initialFormState = getInitialFormState({ statement: statementRequest, withEntriesList: false, defaultFormState });

  return (
    <FormPageLayout
      backButtonTitle={locale.admin.button.toStatementRequests}
      header={locale.admin.statementRequestCard.pageTitle}
      onBack={handleToStatementRequests}
    >
      <Form
        initialValues={initialFormState}
        render={({ handleSubmit }) => (
          <FormProvider onSubmit={handleSubmit}>
            <Pattern>
              <Pattern.Span size={9}>
                <Period disabled />
                <Row label={locale.admin.statementRequestForm.label.organization}>
                  <Box className={css.select}>
                    <Fields.MultiSelect disabled extraSmall name={FORM_FIELDS.ORGANIZATION_IDS} options={organizationsOptions} />
                  </Box>
                </Row>
                <Row label={locale.admin.statementRequestForm.label.account}>
                  <Box className={css.select}>
                    <Fields.MultiSelect disabled extraSmall name={FORM_FIELDS.ACCOUNTS} options={accountOptions} />
                  </Box>
                </Row>
                <Operations disabled />
                <FileFormats disabled />
                <CreationParams />
                <DetailDocumentsParams disabled />
                <RegularButton extraSmall data-action={ACTIONS.BACK} dimension="SM" onClick={handleToStatementRequests}>
                  {locale.admin.button.toStatementRequests}
                </RegularButton>
              </Pattern.Span>
            </Pattern>
          </FormProvider>
        )}
        onSubmit={asyncNoop}
      />
    </FormPageLayout>
  );
};

StatementRequestCard.displayName = 'StatementRequestCard';
