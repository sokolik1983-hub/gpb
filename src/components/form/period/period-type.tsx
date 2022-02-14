import React from 'react';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { DATE_PERIOD_OPTIONS } from 'stream-constants';
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
