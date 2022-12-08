import React from 'react';
import { PeriodType } from 'components/common/form/period/period-type';
import { Row } from 'components/common/form/row';
import { FORM_FIELD_LABELS, FORM_FIELDS } from 'stream-constants/form';
import { Box, Horizon } from '@platform/ui';
import css from './styles.scss';

/** Компонент поля Период получения выписки по расписанию. */
export const SchedulePeriod = () => (
  <Row label={FORM_FIELD_LABELS[FORM_FIELDS.PERIOD_TYPE]}>
    <Box className={css.period}>
      <Horizon>
        <PeriodType />
      </Horizon>
    </Box>
  </Row>
);
SchedulePeriod.displayName = 'SchedulePeriod';
