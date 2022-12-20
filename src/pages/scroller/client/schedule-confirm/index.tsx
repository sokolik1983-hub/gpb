import React, { useState } from 'react';
import { showModalPicture } from 'components/client/show-modal-picture/show-modal-picture';
import { PageHeader } from 'components/common';
import { Row } from 'components/common/form/row';
import { locale } from 'localization';
import { ScheduleConfirmFooter } from 'pages/form/client/components/schedule-confirm-footer';
import { useLocation } from 'react-router-dom';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { FORM_FIELD_LABELS, FORM_FIELDS } from 'stream-constants/form/schedule-form-state';
import { DATE_PERIOD_SCROLLER_LABELS, SCHEDULE_OPERATIONS, METHOD_LABELS, STATEMENT_FORMAT_LABELS } from 'stream-constants/statement';
import { MainLayout, useRedirect } from '@platform/services/client';
import { formatAccountCode } from '@platform/tools/localization';
import { Checkbox, Gap, Horizon, Pattern, Typography, Box, ServiceIcons } from '@platform/ui';
import css from './styles.scss';

interface IConfirmPageState {
  state: {
    refererPage: {
      values: {
        periodType: string;
        time: string;
        organizations: string[];
        accountIds: string[];
        operations: string;
        method: string;
        format: string;
        email: string[];
      };
    };
  };
}

/**
 * [ВПР] ЭФ Клиента: просмотр запроса на услугу Выписка по расписанию.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=84445704
 * */
export const ScheduleConfirmPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const goBack = useRedirect(COMMON_STREAM_URL.STATEMENT_SCHEDULE_NEW);
  const { state }: IConfirmPageState = useLocation();
  const {
    refererPage: {
      values: { periodType, time, organizations, accountIds, operations, method, format, email },
    },
  } = state;

  return (
    <MainLayout>
      <Gap.XL />
      <Horizon>
        <Gap.XL />
        <Gap.XS />
        <PageHeader
          backButtonTitle={locale.client.breadcrumbs.toRequestPage}
          header={locale.client.scheduleNewPage.title}
          onClick={goBack}
        />
      </Horizon>
      <Gap.XL />
      <Box className={css.form} fill={'FAINT'}>
        <Pattern gap={'XL'}>
          <Pattern.Span size={9}>
            <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.PERIOD_TYPE]}>
              <Box className={css.period}>{DATE_PERIOD_SCROLLER_LABELS[periodType]}</Box>
            </Row>
            <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.TIME]}>
              <Box className={css.period}>{time}</Box>
            </Row>
            <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.ORGANIZATIONS]}>
              <Box className={css.period}>{organizations.map(item => item)}</Box>
            </Row>
            <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.ACCOUNTS]}>
              <Box className={css.period}>{accountIds.map(item => formatAccountCode(item))}</Box>
            </Row>
            <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.OPERATION]}>
              <Box className={css.period}>{SCHEDULE_OPERATIONS[operations]}</Box>
            </Row>
            <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.FILE_FORMAT]}>
              <Box className={css.period}>{STATEMENT_FORMAT_LABELS[format]}</Box>
            </Row>
            <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.METHOD]}>
              <Box className={css.period}>{METHOD_LABELS[method]}</Box>
            </Row>
            {email.length > 0 && (
              <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.EMAIL]}>
                <Box className={css.period}>{email.map(item => item)}</Box>
              </Row>
            )}
            <Box style={{ paddingBottom: '40px' }}>
              <Checkbox
                extraSmall
                dimension="SM"
                label={locale.client.scheduleConfirmPage.form.checkBoxLabel}
                name="rulesIsChecked"
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
            </Box>
            <ScheduleConfirmFooter disabled={isChecked} />
          </Pattern.Span>
          <Pattern.Span size={3}>
            <Horizon style={{ cursor: 'pointer' }} onClick={() => showModalPicture('VIEW')}>
              <ServiceIcons.EyeOpened fill={'ACCENT'} scale={'SM'} />
              <Gap.XS />
              <Typography.P fill={'ACCENT'}>{locale.client.actions.view}</Typography.P>
            </Horizon>
          </Pattern.Span>
        </Pattern>
      </Box>
    </MainLayout>
  );
};

ScheduleConfirmPage.displayName = 'ScheduleConfirmPage';
