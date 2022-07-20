import React, { useCallback, useMemo } from 'react';
import isEqual from 'fast-deep-equal';
import { useForm, useFormState } from 'react-final-form';
import { Box, Horizon, Line, Pattern, ROLE } from '@platform/ui';
import { FilterFooter } from './filter-footer';
import css from './styles.scss';
import { ToggleButton } from './toggle-button';
import type { IFilterProperties } from './types';

/** Компонент, используемый внутри формы фильтрации. */
export const Filter: React.FC<IFilterProperties> = ({ AdditionalFilter, QuickFilter, TagsPanel, filterFields, filterState, tagsState }) => {
  const { onClose: closeAdditionalFilter, onClear, onOk, opened, values: currentStateValues } = filterState;
  const { onClick: expandAdditionalFilter } = tagsState;

  const { restart } = useForm();
  const { values, valid } = useFormState();

  const handleApply = useCallback(() => onOk(values), [onOk, values]);

  const handleToggle = useCallback(() => (opened ? closeAdditionalFilter() : expandAdditionalFilter()), [
    opened,
    closeAdditionalFilter,
    expandAdditionalFilter,
  ]);

  const defaultFilterValues = useMemo(
    () =>
      Object.keys(filterFields).reduce(
        (prevDefaultValues, field) => ({
          ...prevDefaultValues,
          [field]: filterFields[field].value,
        }),
        {}
      ),
    [filterFields]
  );

  const handleReset = useCallback(() => {
    onClear();

    console.log({ ...values, ...defaultFilterValues });

    restart({ ...values, ...defaultFilterValues });
    expandAdditionalFilter();
  }, [expandAdditionalFilter, onClear, restart, values, defaultFilterValues]);

  const { pristine, different } = useMemo(() => {
    let defaultEqual = true;
    let diffFromCurrentState = false;

    if (opened) {
      const currentValues = Object.keys(defaultFilterValues).reduce(
        (prevCurrentValues, field) => ({
          ...prevCurrentValues,
          [field]: field in values ? values[field] : defaultFilterValues[field],
        }),
        {}
      );

      defaultEqual = isEqual(defaultFilterValues, currentValues);

      diffFromCurrentState = Object.keys(values).some(key => {
        const value = values[key];
        const notEmpty = Array.isArray(value) ? value.length > 0 : !!value;

        return notEmpty && value !== currentStateValues[key];
      });
    }

    return {
      pristine: defaultEqual,
      different: diffFromCurrentState,
    };
  }, [opened, values, currentStateValues, defaultFilterValues]);

  const disabledApply = !valid || !different;

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
        <TagsPanel defaultFilterValues={defaultFilterValues} />
      </Box>
      <Line fill="FAINT" />
      {opened && (
        <Box aria-expanded={opened} data-name={'additionalFilter'} role={ROLE.PANEL}>
          <Box className={css.additionalFilterWrapper}>
            <AdditionalFilter />
          </Box>
          <Line fill="FAINT" />
          <FilterFooter disabledApply={disabledApply} disabledReset={pristine} onApply={handleApply} onReset={handleReset} />
          <Line fill="FAINT" />
        </Box>
      )}
    </>
  );
};

Filter.displayName = 'Filter';
