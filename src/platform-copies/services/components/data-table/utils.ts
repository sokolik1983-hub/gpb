const SELECTION_AND_EXPAND_WIDTH = 66;
const SELECTION_WIDTH = 30;

/**
 * Метод получения ширины колонок.
 *
 * @param showExpanded - Признак раскрытой строки.
 * @param showCheckbox - Признак отображения чекбокса у строки.
 *
 * */
export const getServiceColumnWidth = (showExpanded: boolean, showCheckbox: boolean): number => {
  if (showExpanded && showCheckbox) {
    return SELECTION_AND_EXPAND_WIDTH;
  }

  if (showCheckbox || showExpanded) {
    return SELECTION_WIDTH;
  }

  return 0;
};
