import React, { useCallback, useMemo } from 'react';
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
  filterFields,
  filterState,
  tagsState,
}) => {
  const { onClose: closeAdditionalFilter, opened, onOk } = filterState;
  const { onClick: expandAdditionalFilter } = tagsState;

  const { restart } = useForm();
  const { values } = useFormState();

  const handleApply = useCallback(() => onOk(values), [onOk, values]);

  const handleToggle = useCallback(() => (opened ? closeAdditionalFilter() : expandAdditionalFilter()), [
    opened,
    closeAdditionalFilter,
    expandAdditionalFilter,
  ]);

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

  const handleReset = useCallback(() => {
    expandAdditionalFilter();
    restart({ ...values, ...defaultAdditionalFilterValues });
  }, [defaultAdditionalFilterValues, expandAdditionalFilter, restart, values]);

  const pristine = useMemo(() => {
    if (opened) {
      const currentAdditionalValues = Object.keys(defaultAdditionalFilterValues).reduce(
        (currentValues, field) => ({
          ...currentValues,
          [field]: field in values ? values[field] : defaultAdditionalFilterValues[field],
        }),
        {}
      );

      return isEqual(defaultAdditionalFilterValues, currentAdditionalValues);
    }

    return true;
  }, [defaultAdditionalFilterValues, opened, values]);

  return (
    <>
      <Box className={css.filterWrapper}>
        <Pattern>
          <Pattern.Span size={10}>
            <QuickFilter />
          </Pattern.Span>
          <Pattern.Span size={2}>
            <Horizon align={'CENTER'} className={css.toggleButtonWrapper}>
              <Horizon.Spacer />
              <ToggleButton opened={opened} onClick={handleToggle} />
            </Horizon>
          </Pattern.Span>
        </Pattern>
        <TagsPanel defaultAdditionalFilterValues={defaultAdditionalFilterValues} />
      </Box>
      <Line fill="FAINT" />
      {opened && (
        <Box aria-expanded={opened} data-name={'additionalFilter'} role={ROLE.PANEL}>
          <Box className={css.additionalFilterWrapper}>
            <AdditionalFilter />
          </Box>
          <Line fill="FAINT" />
          <FilterFooter disabled={pristine} onApply={handleApply} onReset={handleReset} />
          <Line fill="FAINT" />
        </Box>
      )}
    </>
  );
};

Filter.displayName = 'Filter';
