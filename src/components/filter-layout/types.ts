import type React from 'react';
import type { ValidationErrors } from 'final-form';
import type { IFilterPanel, ITagsPanel } from 'interfaces';
import type { ITagsPanelProps } from 'interfaces/client';
import type { IFilterField } from '@platform/services';

/** Пропсы фильтра. */
export interface IFilterProperties {
  /** Компонент с дополнительными полями фильтрации. */
  AdditionalFilter: React.ComponentType;
  /** Компонент с основными полями фильтрации. */
  QuickFilter: React.ComponentType;
  /** Компонент с тегами фильтрации. */
  TagsPanel: React.ComponentType<ITagsPanelProps>;
  /** Дополнительные поля фильтрации. */
  additionalFilterFields: string[];
  /** Значения полей и условия фильтрации. */
  filterFields: Record<string, IFilterField>;
  /** Объект, который возвращается платформенным хуком useFilter в поле "filterPanel". */
  filterState: IFilterPanel;
  /** Объект, который возвращается платформенным хуком useFilter в поле "tagsPanel". */
  tagsState: ITagsPanel;
  /** Функция валидации значений формы. */
  validate?(values: any): Promise<ValidationErrors> | ValidationErrors;
}
