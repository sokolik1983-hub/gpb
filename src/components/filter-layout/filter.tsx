import React, { useCallback, useEffect, useMemo, useState } from 'react';
import isEqual from 'fast-deep-equal';
import { useForm, useFormState } from 'react-final-form';
import { Box, Horizon, Line, Pattern, ROLE } from '@platform/ui';
import { FilterFooter } from './filter-footer';
import css from './styles.scss';
import { ToggleButton } from './toggle-button';
import type { IFilterProperties } from './types';

/** Компонент, используемый внутри формы фильтрации. */
export const Filter: React.FC<IFilterProperties> = ({
  AdditionalFilter,
  QuickFilter,
  TagsPanel,
  additionalFilterFields,
  applyMixValuesFormAndStorage,
  filterFields,
  filterState,
  setActiveFieldAndValue,
}) => {
  const [visibleAdditionalFilter, setVisibleAdditionalFilter] = useState(false);

  const { values: currentStateValues } = filterState;

  const { restart, submit } = useForm();
  const { active, errors, valid, values } = useFormState();

  useEffect(() => setActiveFieldAndValue?.(active ? [active, values[active]] : undefined), [active, setActiveFieldAndValue, values]);

  const handleToggle = useCallback(() => setVisibleAdditionalFilter(!visibleAdditionalFilter), [visibleAdditionalFilter]);

  const defaultAdditionalFilterValues = useMemo(
    () =>
      Object.keys(filterFields)
        .filter(field => additionalFilterFields.includes(field))
        .reduce(
          (prevDefaultStateOfAdditionalFilter, field) => ({
            ...prevDefaultStateOfAdditionalFilter,
            [field]: filterFields[field].value,
          }),
          {}
        ),
    [additionalFilterFields, filterFields]
  );

  /** Сбросить поля дополнительного фильтра. */
  const handleReset = useCallback(() => {
    restart({ ...values, ...defaultAdditionalFilterValues });

    const errorAdditionalFilter = additionalFilterFields.some(item => errors?.[item]);

    if (errorAdditionalFilter) {
      void submit();

      return;
    }

    if (valid) {
      void submit();
    }
  }, [additionalFilterFields, defaultAdditionalFilterValues, errors, restart, submit, valid, values]);

  const pristine = useMemo(() => {
    if (visibleAdditionalFilter) {
      const currentAdditionalValues = Object.keys(defaultAdditionalFilterValues).reduce(
        (currentValues, field) => ({
          ...currentValues,
          [field]: field in values ? values[field] : defaultAdditionalFilterValues[field],
        }),
        {}
      );

      const diffFromCurrentState = Object.keys(currentAdditionalValues).some(
        key => currentAdditionalValues[key] !== currentStateValues[key]
      );

      return !diffFromCurrentState && isEqual(defaultAdditionalFilterValues, currentAdditionalValues);
    }

    return true;
  }, [currentStateValues, defaultAdditionalFilterValues, values, visibleAdditionalFilter]);

  return (
    <>
      <Box className={css.filterWrapper}>
        <Pattern>
          <Pattern.Span size={10}>
            <QuickFilter applyMixValuesFormAndStorage={applyMixValuesFormAndStorage} />
          </Pattern.Span>
          <Pattern.Span size={2}>
            <Horizon align={'CENTER'} className={css.toggleButtonWrapper}>
              <Horizon.Spacer />
              <ToggleButton opened={visibleAdditionalFilter} onClick={handleToggle} />
            </Horizon>
          </Pattern.Span>
        </Pattern>
        <TagsPanel
          defaultAdditionalFilterValues={defaultAdditionalFilterValues}
          onChangeVisibleAdditionalFilter={setVisibleAdditionalFilter}
        />
      </Box>
      <Line fill="FAINT" />
      {visibleAdditionalFilter && (
        <Box aria-expanded={visibleAdditionalFilter} data-name={'additionalFilter'} role={ROLE.PANEL}>
          <Box className={css.additionalFilterWrapper}>
            <AdditionalFilter />
          </Box>
          <Line fill="FAINT" />
          <FilterFooter disabled={pristine} onApply={submit} onReset={handleReset} />
          <Line fill="FAINT" />
        </Box>
      )}
    </>
  );
};

Filter.displayName = 'Filter';
