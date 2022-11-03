import type { FC } from 'react';
import React, { useCallback, useRef, useState } from 'react';
import isEqual from 'fast-deep-equal';
import { Form } from 'react-final-form';
import { Filter } from './filter';
import css from './styles.scss';
import type { IFilterProperties } from './types';

/** Лэйаут фильтров скроллера. */
export const FilterLayout: FC<Omit<IFilterProperties, 'applyMixValuesFormAndStorage'>> = ({
  AdditionalFilter,
  QuickFilter,
  TagsPanel,
  filterState,
  additionalFilterFields = [],
  filterFields,
  setActiveFieldAndValue,
  tagsState,
  validate,
}) => {
  const [applyingMixValuesFormAndStorage, setApplyingMixValuesFormAndStorage] = useState(false);

  const { onOk, values: storageValues } = filterState;

  // Инициализация формы происходит из значений полученных из хука useFilter.
  // т.к. в хуке useFilter, происходит вычисление начальных значений формы фильтрации,
  // на основе значений из Locale Storage.
  const initialValues = useRef(storageValues).current;

  /**
   * Обработчик отправки формы.
   *
   * @param formValues - Состояние формы.
   */
  const handleOk = useCallback(
    formValues => {
      if (applyingMixValuesFormAndStorage) {
        setApplyingMixValuesFormAndStorage(false);

        const currentAdditionalFilterValues = additionalFilterFields.reduce(
          (additionalFilterValues, item) =>
            storageValues[item] && !isEqual(storageValues[item], filterFields[item].value)
              ? { ...additionalFilterValues, [item]: storageValues[item] }
              : { ...additionalFilterValues },
          {}
        );

        const values = { ...formValues, ...currentAdditionalFilterValues };

        onOk(values);
      } else {
        onOk(formValues);
      }
    },
    [applyingMixValuesFormAndStorage, additionalFilterFields, filterFields, onOk, storageValues]
  );

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
            applyMixValuesFormAndStorage={setApplyingMixValuesFormAndStorage}
            filterFields={filterFields}
            filterState={filterState}
            setActiveFieldAndValue={setActiveFieldAndValue}
            tagsState={tagsState}
          />
        </form>
      )}
      validate={validate}
      onSubmit={handleOk}
    />
  );
};

FilterLayout.displayName = 'FilterLayout';
