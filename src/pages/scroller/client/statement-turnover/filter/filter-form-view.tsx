import type { FC } from 'react';
import React, { useEffect, useContext } from 'react';
import { FocusNode } from 'components/focus-tree';
import { FORM_FIELDS } from 'pages/scroller/client/statement-turnover/filter/constants';
import type { FormRenderProps } from 'react-final-form';
import { COMMON_SCROLLER_NODE, TURNOVERS_SCROLLER_FILTER_NODE, TURNOVERS_SCROLLER_TABLE_ACTIONS_NODE } from 'stream-constants/a11y-nodes';
import { isValidDateRange } from 'utils';
import { Box, Line } from '@platform/ui';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { FilterPanel } from './filter-panel';
import { GroupingPanel } from './grouping-panel';
import type { IFormState } from './interfaces';
import css from './styles.scss';
import { Totals } from './totals';

/** Форма фильтра и группировки. */
export const FilterFormView: FC<FormRenderProps<IFormState>> = ({ valid, values }) => {
  const {
    filterPanel: { onOk },
  } = useContext(TurnoverScrollerContext);

  useEffect(() => {
    // При изменении значений формы, и если она валидна, происходит обновление состояния хука useFilter.
    /*
     * Дополнена проверка isValidDateRange, т.к. в final-form замечена особенность - при невалидных полях форма
     * рендерится два раза:
     * - первый с невалидными values, но валидными флагами типа valid, invalid, errors
     * - второй раз как должно быть - невалидными values и соответствующими флагами (valid и т.д.)
     * P.S С валидными данными происходит один рендер.
     */
    if (valid && isValidDateRange({ dateFrom: values[FORM_FIELDS.DATE_FROM], dateTo: values[FORM_FIELDS.DATE_TO] })) {
      onOk(values);
    }
  }, [valid, onOk, values]);

  return (
    <Box className={css.wrapper}>
      <FocusNode nodeId={TURNOVERS_SCROLLER_FILTER_NODE} parentId={COMMON_SCROLLER_NODE}>
        <Box className={css.filterWrapper}>
          <FilterPanel />
        </Box>
      </FocusNode>
      <Line fill="FAINT" />
      <Totals />
      <FocusNode nodeId={TURNOVERS_SCROLLER_TABLE_ACTIONS_NODE} parentId={COMMON_SCROLLER_NODE}>
        <GroupingPanel />
      </FocusNode>
    </Box>
  );
};

FilterFormView.displayName = 'FilterFormView';
