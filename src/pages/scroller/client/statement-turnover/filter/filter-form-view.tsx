import type { FC } from 'react';
import React, { useEffect, useContext } from 'react';
import { TagsPanel } from 'pages/scroller/client/statement-turnover/filter/tags-panel';
import { Totals } from 'pages/scroller/client/statement-turnover/filter/totals';
import type { FormRenderProps } from 'react-final-form';
import { Box, Line } from '@platform/ui';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { FilterPanel } from './filter-panel';
import { GroupingPanel } from './grouping-panel';
import type { FormState } from './interfaces';
import css from './styles.scss';

/** Форма фильтра и группировки. */
export const FilterFormView: FC<FormRenderProps<FormState>> = ({ values }) => {
  const {
    filterPanel: { onOk },
  } = useContext(TurnoverScrollerContext);

  useEffect(() => {
    // При изменении значений формы, происходит обновление состояния хука useFilter.
    onOk(values);
  }, [onOk, values]);

  return (
    <Box>
      <Box className={css.filterWrapper}>
        <FilterPanel />
        <TagsPanel />
      </Box>
      <Line fill="FAINT" />
      <Totals />
      <GroupingPanel />
    </Box>
  );
};

FilterFormView.displayName = 'FilterFormView';
