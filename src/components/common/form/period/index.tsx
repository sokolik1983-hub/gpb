import React, { useCallback } from 'react';
import { DateRange } from 'components/common/form/date-range';
import { Row } from 'components/common/form/row';
import { DATE_PERIODS } from 'interfaces';
import { CREATION_PARAMS } from 'interfaces/form';
import { useForm, useFormState } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELDS, FORM_FIELD_LABELS } from 'stream-constants/form';
import { isNeedTotalsOfDay } from 'utils/common';
import type { OnChangeType } from '@platform/ui';
import { Gap, Box, Horizon } from '@platform/ui';
import { PeriodType } from './period-type';
import css from './styles.scss';

interface PeriodProps {
  disabled?: boolean;
}

/** Компонент задания периода (именованный период + даты). */
export const Period: React.FC<PeriodProps> = ({ disabled }) => {
  const { change, batch } = useForm();
  const { values } = useFormState<IFormState>();

  const onChange = useCallback(
    (resetNeedTotalsOfDay: boolean) => {
      if (resetNeedTotalsOfDay) {
        batch(() => {
          change(
            FORM_FIELDS.CREATION_PARAMS,
            values.creationParams.filter(x => x !== CREATION_PARAMS.TOTALS_OF_DAY)
          );
          change(FORM_FIELDS.PERIOD_TYPE, DATE_PERIODS.SELECT_PERIOD);
        });
      } else {
        change(FORM_FIELDS.PERIOD_TYPE, DATE_PERIODS.SELECT_PERIOD);
      }
    },
    [batch, change, values.creationParams]
  );

  const onChangeFrom = useCallback(
    ({ value }) => {
      onChange(
        !isNeedTotalsOfDay({
          ...values,
          dateFrom: value,
        }) && values.creationParams.includes(CREATION_PARAMS.TOTALS_OF_DAY)
      );
    },
    [onChange, values]
  );

  const onChangeTo: OnChangeType<string> = useCallback(
    ({ value }) => {
      onChange(
        !isNeedTotalsOfDay({
          ...values,
          dateTo: value,
        }) && values.creationParams.includes(CREATION_PARAMS.TOTALS_OF_DAY)
      );
    },
    [onChange, values]
  );

  return (
    <Row label={FORM_FIELD_LABELS[FORM_FIELDS.PERIOD_TYPE]}>
      <Box className={css.period}>
        <Horizon>
          <PeriodType disabled={disabled} />
          <Gap />
          <DateRange
            disabled={disabled}
            name={[FORM_FIELDS.DATE_FROM, FORM_FIELDS.DATE_TO]}
            onChangeFrom={onChangeTo}
            onChangeTo={onChangeFrom}
          />
        </Horizon>
      </Box>
    </Row>
  );
};

Period.displayName = 'Period';
