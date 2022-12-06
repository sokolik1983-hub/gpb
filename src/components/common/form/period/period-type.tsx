import React from 'react';
import { DATE_PERIOD_OPTIONS } from 'stream-constants';
import { FORM_FIELDS } from 'stream-constants/form';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';
import { usePeriod } from './use-period';

/** Параметры компонента PeriodType. */
interface PeriodTypeProps {
  disabled?: boolean;
}

/** Компонент задания типа периода (именованного периода). */
export const PeriodType: React.FC<PeriodTypeProps> = ({ disabled }) => {
  usePeriod();

  return (
    <Box className={css.period}>
      <Fields.Select extraSmall disabled={disabled} name={FORM_FIELDS.PERIOD_TYPE} options={DATE_PERIOD_OPTIONS} />
    </Box>
  );
};

PeriodType.displayName = 'PeriodType';
