import type { FC } from 'react';
import React, { useEffect, useContext } from 'react';
import { FORM_FIELDS } from 'pages/scroller/client/statement-turnover/filter/constants';
import type { FormRenderProps } from 'react-final-form';
import { isValidDateRange } from 'utils/common';
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
      <Box className={css.filterWrapper}>
        <FilterPanel />
      </Box>
      <Line fill="FAINT" />
      <Totals />
      <GroupingPanel />
    </Box>
  );
};

FilterFormView.displayName = 'FilterFormView';
