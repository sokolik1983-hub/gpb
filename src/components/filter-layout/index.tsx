import type { FC } from 'react';
import React, { useRef } from 'react';
import { Form } from 'react-final-form';
import { Filter } from './filter';
import css from './styles.scss';
import type { IFilterProperties } from './types';

/** Лэйаут фильтров скроллера. */
export const FilterLayout: FC<IFilterProperties> = ({
  AdditionalFilter,
  QuickFilter,
  TagsPanel,
  filterState,
  additionalFilterFields,
  filterFields,
  tagsState,
  validate,
}) => {
  const { onOk, values: valuesFromHookUseFilter } = filterState;

  // Инициализация формы происходит из значений полученных из хука useFilter.
  // т.к. в хуке useFilter, происходит вычисление начальных значений формы фильтрации,
  // на основе значений из Locale Storage.
  const initialValues = useRef(valuesFromHookUseFilter).current;

  return (
    <Form
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form className={css.wrapper} onSubmit={handleSubmit}>
          <Filter
            AdditionalFilter={AdditionalFilter}
            QuickFilter={QuickFilter}
            TagsPanel={TagsPanel}
            additionalFilterFields={additionalFilterFields}
            filterFields={filterFields}
            filterState={filterState}
            tagsState={tagsState}
          />
        </form>
      )}
      validate={validate}
      onSubmit={onOk}
    />
  );
};

FilterLayout.displayName = 'FilterLayout';
