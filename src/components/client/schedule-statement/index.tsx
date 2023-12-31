import React from 'react';
import { ScheduleStatementFooter } from 'components/client/schedule-statement-footer';
import { showModalPicture } from 'components/client/show-modal-picture/show-modal-picture';
import { Row } from 'components/common/form/row';
import { locale } from 'localization';
import { exampleScheduleParams } from 'mocks/shedule-statement-params';
import { FORM_FIELD_LABELS, FORM_FIELDS } from 'stream-constants/form/schedule-form-state';
import { Box, Gap, Horizon, Pattern, ServiceIcons, Typography } from '@platform/ui';
import css from './styles.scss';

export const ScheduleStatementParams = () => (
  <Box className={css.wrap} fill={'FAINT'}>
    <Pattern gap={'XL'}>
      <Pattern.Span size={9}>
        <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.PERIOD_TYPE]}>
          <Box>{exampleScheduleParams.periodType}</Box>
        </Row>
        <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.TIME]}>
          <Box>{exampleScheduleParams.time}</Box>
        </Row>
        <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.ORGANIZATIONS]}>
          <Box>{exampleScheduleParams.organizations}</Box>
        </Row>
        <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.ACCOUNTS]}>
          <Box>{exampleScheduleParams.accountNumber}</Box>
        </Row>
        <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.OPERATION]}>
          <Box>{exampleScheduleParams.operations}</Box>
        </Row>
        <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.FILE_FORMAT]}>
          <Box>{exampleScheduleParams.format}</Box>
        </Row>
        <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.METHOD]}>
          <Box>{exampleScheduleParams.method}</Box>
        </Row>
        <Row align={'TOP'} label={FORM_FIELD_LABELS[FORM_FIELDS.EMAIL]}>
          <Box>{exampleScheduleParams.email}</Box>
        </Row>
        <ScheduleStatementFooter />
      </Pattern.Span>
      <Pattern.Span size={3}>
        <Box>
          <Typography.P fill={'FAINT'}>{locale.client.scheduleStatementPage.testData.strings.date}</Typography.P>
        </Box>
        <Box>
          <Typography.P>{locale.client.scheduleStatementPage.testData.strings.getDate}</Typography.P>
        </Box>
        <Box>
          <Typography.P fill={'FAINT'}>{locale.client.scheduleStatementPage.testData.strings.createdAt}</Typography.P>
        </Box>
        <Box>
          <Typography.P>{exampleScheduleParams.name}</Typography.P>
        </Box>
        <Box>
          <Typography.P>{exampleScheduleParams.secondName}</Typography.P>
        </Box>
        <Box>
          <Typography.P style={{ paddingBottom: '12px' }}>{exampleScheduleParams.surname}</Typography.P>
        </Box>
        <Horizon style={{ cursor: 'pointer' }} onClick={() => showModalPicture('CANCEL')}>
          <Box className={css.iconWrapper}>
            <ServiceIcons.Close fill={'ACCENT'} scale={'SM'} />
          </Box>
          <Gap.XS />
          <Typography.P fill={'ACCENT'}>{locale.client.actions.cancel}</Typography.P>
        </Horizon>
      </Pattern.Span>
    </Pattern>
  </Box>
);
ScheduleStatementParams.displayName = 'ScheduleStatementParams';
