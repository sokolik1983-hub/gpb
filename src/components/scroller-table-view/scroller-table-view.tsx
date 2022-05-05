import React from 'react';
import cn from 'classnames';
import { PAGE_SIZES, Pagination } from 'components/pagination';
import { ScrollerPlaceholder } from 'components/scroller-placeholder';
import { ScrollerSpinnerPlaceholder } from 'components/scroller-spinner-placeholder';
import { AccessibilityContext, useAccessibility } from 'components/scroller-table-view/accessibility';
import { ScrollButton } from 'components/scroller-table-view/scroll-button';
import { TableBody } from 'components/scroller-table-view/table-body';
import { TableHeader } from 'components/scroller-table-view/table-header';
import type { RecordCell } from 'components/scroller-table-view/types';
import { useScrollButton } from 'hooks/use-scroll-button';
import type { IPagination } from 'interfaces';
import type { TableInstance } from 'react-table';
import { Box, Gap, LayoutScroll, ROLE } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ScrollerTableView. */
export interface IScrollerTableViewProps<Row extends RecordCell> {
  /** Экземпляр таблицы. */
  tableInstance: TableInstance<Row>;
  /** Признак процесса запроса данных. */
  loading?: boolean;
  /** Лейбл плейсхолдера. */
  placeholderLabel: string;
  /** Обработчик клика по строке. */
  onClick?(row: Row): void;
  /** Если true - то отображаются только выбранные строки. */
  isVisibleOnlySelectedRows?: boolean;
  /** Устанавливает пагинацию. */
  setPagination(value: IPagination): void;
  /** Общее количество записей. */
  totalAmount: number;
}

/**
 * Таблица скроллера. Реализована как глупый компонент.
 * Предполагается использовать её во всех скроллерах стрима.
 */
export const ScrollerTableView = <Row extends RecordCell>({
  tableInstance,
  loading,
  placeholderLabel,
  onClick,
  isVisibleOnlySelectedRows,
  setPagination,
  totalAmount,
}: IScrollerTableViewProps<Row>) => {
  const {
    disableMultiSort,
    headerGroups,
    getTableProps,
    pageCount,
    rows,
    state: { pageSize },
  } = tableInstance;

  const { ScrollIcon, handleScroll, handleScrollButtonClick, isScrollButtonVisible, setScrolledElementRef } = useScrollButton();

  const { getTableAccessibilityProps, ...restAccessibilityProps } = useAccessibility(tableInstance);

  return (
    <Box className={css.tableWrapper}>
      <AccessibilityContext.Provider value={{ ...restAccessibilityProps }}>
        <table {...getTableProps({ role: ROLE.GRID })} className={cn(css.table, css.layoutScrollWrapper)} {...getTableAccessibilityProps()}>
          <TableHeader disableMultiSort={disableMultiSort} headerGroups={headerGroups} />
          {loading && <ScrollerSpinnerPlaceholder />}
          {!loading && rows.length === 0 && <ScrollerPlaceholder label={placeholderLabel} />}
          {!loading && rows.length > 0 && (
            <>
              <LayoutScroll innerRef={setScrolledElementRef} onScroll={handleScroll}>
                <TableBody isVisibleOnlySelectedRows={isVisibleOnlySelectedRows} tableInstance={tableInstance} onClick={onClick} />
                {pageCount * pageSize > PAGE_SIZES.PER_25 && (
                  <Pagination setPagination={setPagination} tableInstance={tableInstance} totalAmount={totalAmount} />
                )}
              </LayoutScroll>
              <Gap.X2L />
              {isScrollButtonVisible && <ScrollButton Icon={ScrollIcon} onClick={handleScrollButtonClick} />}
            </>
          )}
        </table>
      </AccessibilityContext.Provider>
    </Box>
  );
};

ScrollerTableView.displayName = 'ScrollerTableView';
