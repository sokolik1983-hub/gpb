import React from 'react';
import { usePeriod } from 'pages/form/client/hooks/use-period';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { DATE_PERIOD_OPTIONS } from 'stream-constants';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';

export const PeriodType: React.FC = () => {
  usePeriod();

  return (
    <Box className={css.periodType}>
      <Fields.Select extraSmall name={FORM_FIELDS.PERIOD_TYPE} options={DATE_PERIOD_OPTIONS} />
    </Box>
  );
};

PeriodType.displayName = 'PeriodType';
