import React from 'react';
import { Row } from 'components/common/form/row';
import { locale } from 'localization';
import { FORM_FIELDS } from 'stream-constants/form/schedule-form-state';
import { METHOD_OPTIONS } from 'stream-constants/statement';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';

/** Компонент задания типа способа получения выписки по расписанию. */
export const ScheduleChannel: React.FC = () => (
  <Row label={locale.common.method.label}>
    <Box className={css.scheduleType}>
      <Fields.Select extraSmall name={FORM_FIELDS.METHOD} options={METHOD_OPTIONS} />
    </Box>
  </Row>
);

ScheduleChannel.displayName = 'ScheduleChannel';
