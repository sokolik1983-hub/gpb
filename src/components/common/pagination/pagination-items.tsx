import React, { useMemo, useCallback } from 'react';
import { Box, Horizon, Gap, Typography, ServiceIcons, WithClickable } from '@platform/ui';
import { GAP_SYMBOL, MAX_PAGINATION_ITEMS } from './constants';
import { PaginationItem } from './pagination-item';
import css from './styles.scss';

/** Вспомогательный тип. Tuple из пяти подряд чисел. */
type FiveNumbers = [number, number, number, number, number];

/** Символа разрыва пагинации. */
type GapSymbol = typeof GAP_SYMBOL;

/** Возможные варианты пагинации. */
type PaginationConfigs =
  | number[]
  | [...FiveNumbers, GapSymbol, number]
  | [number, GapSymbol, ...FiveNumbers]
  | [number, GapSymbol, number, number, number, GapSymbol, number];

/**
 * Возвращает элементы пагинации.
 *
 * @param currentPage - Текущая страница. Нумеряция начинается с нуля.
 * @param totalPages - Общее количество страниц.
 */
const getPaginationItems = (currentPage: number, totalPages: number): PaginationConfigs => {
  if (totalPages <= MAX_PAGINATION_ITEMS) {
    return [1, 2, 3, 4, 5, 6, 7].slice(0, totalPages);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5, GAP_SYMBOL, totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, GAP_SYMBOL, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, GAP_SYMBOL, currentPage, currentPage + 1, currentPage + 2, GAP_SYMBOL, totalPages];
};

/** Интерфейс пагинации. */
interface PagesProps {
  /** Текущая страница. Нумерация начинается с нуля. */
  currentPageIndex: number;
  /** Обработчик смены страницы. */
  gotoPage(pageIndex: number): void;
  /** Общее кол-во страниц. */
  pageCount: number;
}

/** Элементы управления пагинации. */
export const PaginationItems: React.FC<PagesProps> = ({ gotoPage, pageCount, currentPageIndex }) => {
  const prevPage = useCallback(() => {
    gotoPage(currentPageIndex - 1);
  }, [currentPageIndex, gotoPage]);

  const nextPage = useCallback(() => {
    gotoPage(currentPageIndex + 1);
  }, [currentPageIndex, gotoPage]);

  const paginationItems = useMemo(() => getPaginationItems(currentPageIndex, pageCount), [currentPageIndex, pageCount]);

  const isLeftArrowActive = currentPageIndex !== 0;
  const isRightArrowActive = currentPageIndex !== pageCount - 1;

  return (
    <Horizon>
      {/* Стрелка влево. */}
      <WithClickable>
        {(ref, { hovered }) => (
          <Box ref={ref}>
            <ServiceIcons.ChevronLeft
              className={css.nextPageIcon}
              fill={hovered && isLeftArrowActive ? 'ACCENT' : 'FAINT'}
              scale={'LG'}
              onClick={isLeftArrowActive ? prevPage : undefined}
            />
          </Box>
        )}
      </WithClickable>
      {/* Номера страниц */}
      <Gap.SM />
      {paginationItems.map((item: number | typeof GAP_SYMBOL, index) => (
        <React.Fragment key={String(item) + String(index)}>
          {typeof item === 'number' ? (
            <PaginationItem isCurrent={item - 1 === currentPageIndex} targetPageNumber={item} onClick={() => gotoPage(item - 1)} />
          ) : (
            <Typography.P>{item}</Typography.P>
          )}

          <Gap.SM />
        </React.Fragment>
      ))}
      {/* Стрелка вправо. */}
      <WithClickable>
        {(ref, { hovered }) => (
          <Box ref={ref}>
            <ServiceIcons.ChevronRight
              className={css.nextPageIcon}
              fill={hovered && isRightArrowActive ? 'ACCENT' : 'FAINT'}
              scale={'LG'}
              onClick={isRightArrowActive ? nextPage : undefined}
            />
          </Box>
        )}
      </WithClickable>
    </Horizon>
  );
};

PaginationItems.displayName = 'PaginationItems';
