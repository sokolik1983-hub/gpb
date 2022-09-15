/** Пропсы панели тегов. */
export interface ITagsPanelProps {
  /** Дефолтное состояние дополнительных фильтров. */
  defaultAdditionalFilterValues: Record<string, unknown[] | string>;
  /** Функция изменения видимости дополнительного фильтра. */
  onChangeVisibleAdditionalFilter(visible: boolean): void;
}
