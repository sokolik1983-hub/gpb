import type { FC } from 'react';
import React from 'react';
import { TagsPanel } from 'pages/scroller/client/statement-turnover/filter/tags-panel';
import type { FormRenderProps } from 'react-final-form';
import { Box, Line } from '@platform/ui';
import { FilterPanel } from './filter-panel';
import { GroupingPanel } from './grouping-panel';
import type { FormState } from './interfaces';
import css from './styles.scss';

/** Форма фильтра и группировки. */
export const FilterFormView: FC<FormRenderProps<FormState>> = () => (
  <Box>
    <Box className={css.filterWrapper}>
      <FilterPanel />
      <TagsPanel />
    </Box>
    <Line fill="FAINT" />
    <GroupingPanel />
  </Box>
);

FilterFormView.displayName = 'FilterFormView';
