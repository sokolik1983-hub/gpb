import { COLUMN_PADDING_TYPES } from 'interfaces';
import css from './styles.scss';

/**
 * Возвращает css класс для ячейки таблицы.
 *
 * @param paddingType - Тип отступа ячейки таблицы.
 */
export const getCellPaddingClass = (paddingType?: COLUMN_PADDING_TYPES) => {
  switch (paddingType) {
    case COLUMN_PADDING_TYPES.LEFT_REDUCED:
      return css.leftReducedCell;
    case COLUMN_PADDING_TYPES.RIGHT_REDUCED:
      return css.rightReducedCell;
    case COLUMN_PADDING_TYPES.BOTH_REDUCED:
      return css.bothReducedCell;
    default:
      return css.cell;
  }
};
