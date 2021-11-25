import type { IOption } from '@platform/ui';

/**
 * Объект который возвращается платформенным хуком useFilter в поле "filterPanel".
 * (В платформе не определён возвращаемый тип, приходится переопределять в стриме,
 * поэтому неудачные имена).
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export interface IFilterPanel<T extends object = Record<string, unknown>> {
  /** Значения формы фильтра. */
  values: T;
  /** Если true - то фильтр открыт. */
  opened: boolean;
  /** Закрывает фильтр. */
  onClose(): void;
  /**
   * Обновляет стейт хука useFilter.
   *
   * @param formValues - Обновлённые значения формы.
   */
  onOk(formValues: any): void;
  /** Очищает стейт хука useFilter. */
  onClear(): void;
}

/**
 * Объект который возвращается платформенным хуком useFilter в поле "tagsPanel".
 * (В платформе не определён возвращаемый тип, приходится переопределять в стриме,
 * поэтому неудачные имена).
 */
export interface ITagsPanel {
  /** Теги. Значение value будет равен пути name в форме, для соответствующего значения. */
  tags: Array<IOption<string>>;
  /** Открывает дополнительные фильтры. */
  onClick(): void;
  /** Удаляет теги. */
  onRemoveAllTags(): void;
  /**
   * Удаляет один тег.
   *
   * @param key - Имя поля в форме фильтра.
   */
  onRemoveTag(key: string): void;
}
