import type { RefObject } from 'react';
import { useContext, useMemo } from 'react';
import { StickyRowsContext } from './sticky-rows-context';

/** Параметр хука useIsRowStuck. */
export interface IUseIsRowsStickyArg {
  /** Реф элемента представляющего строку скроллера. */
  rowRef: RefObject<HTMLDivElement>;
  /** Если true - то вызывается для строки группировки второго уровня. */
  isSecondLevelRow?: boolean;
}

/** Определяет находится ли строка в состоянии стики. */
export const useIsRowStuck = ({ rowRef, isSecondLevelRow }: IUseIsRowsStickyArg): boolean => {
  const { scrollPosition, secondLevelRows, firstLevelRows } = useContext(StickyRowsContext);

  const rows = isSecondLevelRow ? secondLevelRows : firstLevelRows;

  const isRowSticky = useMemo(() => {
    if (!rowRef?.current) {
      return false;
    }

    const currentRowIndex = rows.findIndex(item => item?.current === rowRef?.current);

    const nextRow = currentRowIndex === rows.length - 1 ? undefined : rows[currentRowIndex + 1];

    const { offsetTop } = rowRef.current;
    const nextRowOffsetTop = nextRow?.current?.offsetTop ?? Infinity;

    // Определяет отступ от верха таблицы, где строка должна переходить в состояние стики.
    const topIndent = isSecondLevelRow ? firstLevelRows?.[0]?.current?.offsetHeight ?? 0 : 0;

    // Если следующая строка группирующая строка, находится выше того места, где строки должны прилипать,
    // (следующая строка находится в стики состоянии).
    // То текущая строка не рендерится в стики контейнере иначе поведение определяется положением текущей строки
    return scrollPosition + topIndent >= nextRowOffsetTop ? false : scrollPosition + topIndent >= offsetTop;
  }, [firstLevelRows, isSecondLevelRow, rowRef, rows, scrollPosition]);

  return isRowSticky;
};
