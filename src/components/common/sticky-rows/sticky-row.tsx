import type { FC } from 'react';
import React, { useContext, useEffect, useRef } from 'react';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import { StickyRowsContext } from './sticky-rows-context';
import css from './styles.scss';
import { useIsRowStuck } from './use-is-row-stuck';

/** Свойства компонента StickyRow. */
export interface IStickyRowProps {
  /** Если true - то компонент вызывается для рендеринга строки группировки второго уровня. */
  secondLevelRow?: boolean;
}

/** Добавляет строке стики поведение. */
export const StickyRow: FC<IStickyRowProps> = ({ children, secondLevelRow = false }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const { portalRef, setFirstLevelRows, setSecondLevelRows } = useContext(StickyRowsContext);

  const isRowStuck = useIsRowStuck({ rowRef, isSecondLevelRow: secondLevelRow });

  useEffect(() => {
    if (secondLevelRow) {
      setSecondLevelRows(currentState => [...currentState, rowRef]);
    } else {
      setFirstLevelRows(currentState => [...currentState, rowRef]);
    }
  }, [setSecondLevelRows, setFirstLevelRows, secondLevelRow]);

  if (!portalRef.current) {
    return null;
  }

  return (
    <>
      {
        <div ref={rowRef} className={cn(isRowStuck ? css.stuckRow : css.notStuckRow)}>
          {children}
        </div>
      }
      {isRowStuck && ReactDOM.createPortal(children, portalRef.current)}
    </>
  );
};

StickyRow.displayName = 'StickyRow';
