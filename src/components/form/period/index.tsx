import React from 'react';
import { Dates } from 'components/form/dates';
import { Row } from 'components/form/row';
import { FORM_FIELDS, FORM_FIELD_LABELS } from 'stream-constants/form';
import { Gap, Box, Horizon } from '@platform/ui';
import { PeriodType } from './period-type';
import css from './styles.scss';

/** Компонент задания периода (именованный период + даты). */
export const Period: React.FC = () => (
  <Row label={FORM_FIELD_LABELS[FORM_FIELDS.PERIOD_TYPE]}>
    <Horizon>
      <Box className={css.periodTypeWrapper}>
        <PeriodType />
      </Box>
      <Gap />
      <Dates />
    </Horizon>
  </Row>
);

Period.displayName = 'Period';
