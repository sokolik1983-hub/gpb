import React, { useContext } from 'react';
import { Form } from 'react-final-form';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { FilterFormView } from './filter-form-view';
import { getInitialFilterValues } from './utils';

const INITIAL_FORM_VALUES = getInitialFilterValues();

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
