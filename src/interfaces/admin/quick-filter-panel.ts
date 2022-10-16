/** Свойства основного фильтра (быстрый фильтр). */
export interface QuickFilterPanelProps {
  /** Проведён запрос новых значений. */
  fetchedNewTransactions: boolean;
  /** Функция установки признака смешивания данных формы и локального хранилища для отправки на сервер. */
  applyMixValuesFormAndStorage(value: boolean): void;
}
