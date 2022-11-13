import React, { useContext } from 'react';
import { DATE_PERIODS } from 'interfaces';
import { GROUPING_VALUES } from 'interfaces/dto';
import { FORM_FIELDS } from 'pages/scroller/client/statement-turnover/filter/constants';
import { Form } from 'react-final-form';
import { getDateRangeValidationScheme } from 'schemas';
import { validate } from '@platform/validation';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { FilterFormView } from './filter-form-view';

const INITIAL_FORM_VALUES = {
  groupBy: GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES,
  onlyActiveAccounts: false,
  datePeriod: DATE_PERIODS.YESTERDAY,
  dateTo: '',
  dateFrom: '',
  accounts: [],
};

/**
 * Схема валидации формы фильтра скроллера "Обороты".
 */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/** Фильтр скроллера. */
export const Filter: React.FC = () => {
  const { filterPanel } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const { onOk } = filterPanel;

  return <Form initialValues={INITIAL_FORM_VALUES} render={FilterFormView} validate={validate(validationSchema)} onSubmit={onOk} />;
};

Filter.displayName = 'Filter';
