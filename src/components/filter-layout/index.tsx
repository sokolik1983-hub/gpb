import type { FC } from 'react';
import React, { useCallback, useRef } from 'react';
import { FilterFooter } from 'components/filter-layout/filter-footer';
import { ToggleButton } from 'components/filter-layout/toggle-button';
import type { ValidationErrors } from 'final-form';
import type { IFilterPanel, ITagsPanel } from 'interfaces';
import { Form } from 'react-final-form';
import { Box, Line, Horizon, Pattern } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента FilterLayout. */
export interface IFilterProps {
  /** Объект который возвращается платформенным хуком useFilter в поле "filterPanel". */
  filterState: IFilterPanel;
  /** Объект который возвращается платформенным хуком useFilter в поле "tagsPanel". */
  tagsState: ITagsPanel;
  /** Поля фильтров которые всегда видны на форме. */
  quickFilter: React.ComponentType;
  /** Дополнительные поля фильтрации. */
  additionalFilter: React.ComponentType;
  /** Теги формы фильтрации. */
  tagsPanel: React.ComponentType;
  /** Функция валидации значений формы. */
  validate?(values: any): Promise<ValidationErrors> | ValidationErrors;
}

/** Лэйаут фильтров скроллера. */
export const FilterLayout: FC<IFilterProps> = ({
  quickFilter: QuickFilter,
  filterState,
  tagsState,
  tagsPanel: TagsPanel,
  additionalFilter: AdditionalFilter,
  validate,
}) => {
  const { onClose: closeAdditionalFilters, opened, onClear, onOk, values: valuesFromHookUseFilter } = filterState;

  const { onClick: expandAdditionalFilter } = tagsState;

  const handleToggleClick = useCallback(() => {
    if (opened) {
      closeAdditionalFilters();
    } else {
      expandAdditionalFilter();
    }
  }, [opened, closeAdditionalFilters, expandAdditionalFilter]);

  const handleApply = useCallback(
    formValues => {
      onOk(formValues);
    },
    [onOk]
  );

  const handleReset = useCallback(() => {
    onClear();
    expandAdditionalFilter();
  }, [expandAdditionalFilter, onClear]);

  // Инициализация формы происходит из значений полученных из хука useFilter.
  // т.к. в хуке useFilter, происходит вычисление начальных значений формы фильтрации,
  // на основе значений из Locale Storage.
  const initialValues = useRef(valuesFromHookUseFilter).current;

  return (
    <Form
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box className={css.filterWrapper}>
            <Pattern>
              <Pattern.Span size={10}>
                <QuickFilter />
              </Pattern.Span>
              <Pattern.Span size={2}>
                <Horizon align={'CENTER'} className={css.toggleButtonWrapper}>
                  <Horizon.Spacer />
                  <ToggleButton isOpen={opened} onClick={handleToggleClick} />
                </Horizon>
              </Pattern.Span>
            </Pattern>
            <TagsPanel />
          </Box>
          <Line fill="FAINT" />
          {opened && (
            <Box>
              <Box className={css.additionalFilterWrapper}>
                <AdditionalFilter />
              </Box>
              <Line fill="FAINT" />
              <FilterFooter onApply={handleApply} onReset={handleReset} />
              <Line fill="FAINT" />
            </Box>
          )}
        </form>
      )}
      validate={validate}
      onSubmit={onOk}
    />
  );
};

FilterLayout.displayName = 'FilterLayout';
