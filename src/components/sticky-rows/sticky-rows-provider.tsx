import type { FC, RefObject } from 'react';
import React, { useRef, useState, useMemo } from 'react';
import type { IStickyRowsContext } from './sticky-rows-context';
import { StickyRowsContext } from './sticky-rows-context';

/* Провайдер контекста стики поведения. */
export const StickyRowsProvider: FC = ({ children }) => {
  const [portal, setPortal] = useState<HTMLDivElement>();

  const [firstLevelRows, setFirstLevelRows] = useState<Array<RefObject<HTMLDivElement>>>([]);
  const [secondLevelRows, setSecondLevelRows] = useState<Array<RefObject<HTMLDivElement>>>([]);

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const portalRef = useRef<HTMLDivElement>(null);

  const value: IStickyRowsContext = useMemo(
    () => ({
      portalRef,
      portal,
      setPortal,
      scrollPosition,
      setScrollPosition,
      firstLevelRows,
      setFirstLevelRows,
      secondLevelRows,
      setSecondLevelRows,
    }),
    [secondLevelRows, portal, firstLevelRows, scrollPosition]
  );

  return <StickyRowsContext.Provider value={value}>{children}</StickyRowsContext.Provider>;
};

StickyRowsProvider.displayName = 'StickyRowsProvider';
