import type { FC } from 'react';
import React, { useContext, useRef, useCallback, useMemo } from 'react';
import { StickyRowsContext, ScrollerLoadingOverlay } from 'components';
import { useScrollButton } from 'hooks/use-scroll-button';
import type { IGroupedAccounts } from 'interfaces/dto';
import type Scrollbars from 'react-custom-scrollbars';
import type { TableBodyProps, Row } from 'react-table';
import { Box, LayoutScrollComponent, Gap, ROLE } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import css from './styles.scss';
import { ScrollerViews } from './views';

/** Свойства компонента TableBody. */
export interface ITableBodyProps extends TableBodyProps {
  /**
   * Метод, который необходимо вызывать перед рендерингом строки.
   *
   * @see https://react-table.tanstack.com/docs/api/useTable#instance-properties
   */
  prepareRow(row: Row<IGroupedAccounts>): void;
  /** Строки таблицы. */
  rows: Array<Row<IGroupedAccounts>>;
}

/**
 * Свойства компонента "Вид скроллера".
 */
export type IScrollerView = ITableBodyProps;

/** Тело таблицы. */
export const TableBody: FC<ITableBodyProps> = ({ rows, prepareRow, ...tableBodyProps }) => {
  const { turnoversUpdating, groupByForRender } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const { setScrollPosition, portalRef } = useContext(StickyRowsContext);

  const scrolledElementRef = useRef<Scrollbars>();

  const {
    handleScrollButtonClick,
    ScrollIcon,
    handleScroll: handleScrollFromScrollButton,
    isScrollButtonVisible,
    setScrolledElementRef: setScrolledElementRefFromScrollButton,
  } = useScrollButton();

  const setScrolledElementRef = ref => {
    scrolledElementRef.current = ref;
    setScrolledElementRefFromScrollButton(ref);
  };

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      handleScrollFromScrollButton(e);
      setScrollPosition(e.currentTarget.scrollTop);
    },
    [handleScrollFromScrollButton, setScrollPosition]
  );

  const ScrollerView = useMemo(() => ScrollerViews[groupByForRender], [groupByForRender]);

  return (
    <Box className={css.layoutScrollWrapper}>
      <LayoutScrollComponent innerRef={setScrolledElementRef} onScroll={handleScroll}>
        {/* Элемент внутри которого будут рендерится сроки в состоянии стики. */}
        <div ref={portalRef} className={css.portal} style={{ top: scrolledElementRef.current?.getScrollTop() }} />
        <Box {...tableBodyProps} className={css.tableBody}>
          <ScrollerView prepareRow={prepareRow} rows={rows} />
          {turnoversUpdating && <ScrollerLoadingOverlay />}
        </Box>
        <Gap.X2L />
        <Gap.X2L />
      </LayoutScrollComponent>

      {/* Кнопка прокрутки таблицы. */}
      {isScrollButtonVisible && (
        <Box
          inverse
          className={css.scrollIconBox}
          fill="BASE"
          radius="MAX"
          role={ROLE.BUTTON}
          shadow="MD"
          onClick={handleScrollButtonClick}
        >
          {<ScrollIcon fill={'BASE'} scale={'MD'} />}
        </Box>
      )}
    </Box>
  );
};

TableBody.displayName = 'TableBody';
