import React, { useCallback, useMemo } from 'react';
import isEqual from 'fast-deep-equal';
import { useForm, useFormState } from 'react-final-form';
import { EMPTY_VALUE } from 'stream-constants';
import { Box, Horizon, Line, Pattern, ROLE } from '@platform/ui';
import { FilterFooter } from './filter-footer';
import css from './styles.scss';
import { ToggleButton } from './toggle-button';
import type { IFilterProps } from './types';

/** Компонент, используемый внутри формы фильтрации. */
export const Filter: React.FC<IFilterProps> = ({
  AdditionalFilter,
  QuickFilter,
  TagsPanel,
  additionalFilterFields,
  filterField,
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

  /**
   * Получить дефолтное состояние дополнительных полей.
   * Если emptyValue=true - получить данные с пустыми значениями (например, для сброса) и без пустых
   * значений, для корректного сравнения с values формы, т.к. React Final Form удаляет из values поля
   * равные пустой строке.
   */
  const getDefaultAdditionalFilterValues = useCallback(
    (emptyValue: boolean) =>
      Object.keys(filterField)
        .filter(field => additionalFilterFields.includes(field))
        .reduce((prevDefaultStateOfAdditionalFilter, field) => {
          if (emptyValue) {
            return filterField[field].value === EMPTY_VALUE
              ? prevDefaultStateOfAdditionalFilter
              : { ...prevDefaultStateOfAdditionalFilter, [field]: filterField[field].value };
          }

          return { ...prevDefaultStateOfAdditionalFilter, [field]: filterField[field].value };
        }, {}),
    [additionalFilterFields, filterField]
  );

  const handleReset = useCallback(() => {
    expandAdditionalFilter();
    restart({ ...values, ...getDefaultAdditionalFilterValues(false) });
  }, [getDefaultAdditionalFilterValues, expandAdditionalFilter, restart, values]);

  const pristine = useMemo(() => {
    if (opened) {
      const currentAdditionalValues = additionalFilterFields
        .filter(field => field in values && values[field] !== EMPTY_VALUE)
        .reduce(
          (currentValues, field) => ({
            ...currentValues,
            [field]: values[field],
          }),
          {}
        );

      return isEqual(getDefaultAdditionalFilterValues(true), currentAdditionalValues);
    }

    return true;
  }, [additionalFilterFields, getDefaultAdditionalFilterValues, opened, values]);

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
        <TagsPanel defaultAdditionalFilterValues={getDefaultAdditionalFilterValues(false)} />
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
