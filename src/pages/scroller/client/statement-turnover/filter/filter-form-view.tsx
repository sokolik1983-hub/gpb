import type { FC } from 'react';
import React from 'react';
import type { FormRenderProps } from 'react-final-form';
import { Box, Line } from '@platform/ui';
import { FilterPanel } from './filter-panel';
import { GroupingPanel } from './grouping-panel';
import type { IFormState } from './interfaces';
import css from './styles.scss';
import { Totals } from './totals';

/** Форма фильтра и группировки. */
export const FilterFormView: FC<FormRenderProps<IFormState>> = () => (
  <Box className={css.wrapper}>
    <Box className={css.filterWrapper}>
      <FilterPanel />
    </Box>
    <Line fill="FAINT" />
    <Totals />
    <GroupingPanel />
  </Box>
);

FilterFormView.displayName = 'FilterFormView';
