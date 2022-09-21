import React from 'react';
import { DATE_PERIOD_OPTIONS } from 'stream-constants';
import { FORM_FIELDS } from 'stream-constants/form';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';
import { usePeriod } from './use-period';

/** Компонент задания типа периода (именованного периода). */
export const PeriodType: React.FC = () => {
  usePeriod();

  return (
    <Box className={css.periodType}>
      <Fields.Select extraSmall name={FORM_FIELDS.PERIOD_TYPE} options={DATE_PERIOD_OPTIONS} />
    </Box>
  );
};

PeriodType.displayName = 'PeriodType';
