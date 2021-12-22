import React, { useContext } from 'react';
import { DATE_PERIODS } from 'interfaces';
import { GROUPING_VALUES } from 'interfaces/client';
import { Form } from 'react-final-form';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { FilterFormView } from './filter-form-view';

const INITIAL_FORM_VALUES = {
  groupBy: GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES,
  onlyActiveAccounts: true,
  datePeriod: DATE_PERIODS.YESTERDAY,
  dateTo: '',
  dateFrom: '',
  accounts: [],
};

/** Фильтр скроллера. */
export const Filter: React.FC = () => {
  const { filterPanel } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const { onOk } = filterPanel;

  return (
    <Form
      initialValues={INITIAL_FORM_VALUES}
      render={FilterFormView}
      onSubmit={onOk}
      // TODO: Добавить валидацию, когда будет аналитика.
    />
  );
};

Filter.displayName = 'Filter';
