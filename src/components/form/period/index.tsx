import React from 'react';
import { Dates } from 'components/form/dates';
import { Row } from 'components/form/row';
import { FORM_FIELDS, FORM_FIELD_LABELS } from 'interfaces/form/form-state';
import { Gap, Box } from '@platform/ui';
import { PeriodType } from './period-type';
import css from './styles.scss';

/** Компонент задания периода (именованный период + даты). */
export const Period: React.FC = () => {
  const isOneTimeStatementType = true;

  return isOneTimeStatementType ? (
    <Row label={FORM_FIELD_LABELS[FORM_FIELDS.PERIOD_TYPE]}>
      <Box className={css.periodTypeWrapper}>
        <PeriodType />
      </Box>
      <Gap />
      <Dates />
    </Row>
  ) : null;
};

Period.displayName = 'Period';
