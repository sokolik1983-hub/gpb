import React, { useCallback } from 'react';
import { DateRange } from 'components/form/date-range';
import { Row } from 'components/form/row';
import { DATE_PERIODS } from 'interfaces';
import { useForm } from 'react-final-form';
import { FORM_FIELDS, FORM_FIELD_LABELS } from 'stream-constants/form';
import { Gap, Box, Horizon } from '@platform/ui';
import { PeriodType } from './period-type';
import css from './styles.scss';

/** Компонент задания периода (именованный период + даты). */
export const Period: React.FC = () => {
  const { change } = useForm();

  const onChangeDate = useCallback(() => change(FORM_FIELDS.PERIOD_TYPE, DATE_PERIODS.SELECT_PERIOD), [change]);

  return (
    <Row label={FORM_FIELD_LABELS[FORM_FIELDS.PERIOD_TYPE]}>
      <Box className={css.period}>
        <Horizon>
          <PeriodType />
          <Gap />
          <DateRange name={[FORM_FIELDS.DATE_FROM, FORM_FIELDS.DATE_TO]} onChange={onChangeDate} />
        </Horizon>
      </Box>
    </Row>
  );
};

Period.displayName = 'Period';
