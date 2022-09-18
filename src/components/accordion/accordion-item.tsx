import React, { useCallback, forwardRef, useRef, useEffect, useMemo } from 'react';
import type { IFocusParentNodeProps } from 'components/focus-tree';
import { FocusNode } from 'components/focus-tree';
import { useToggle, Box } from '@platform/ui';
import css from './styles.scss';

/**
 * Свойства компонента "Аккордеон".
 */
interface IAccordionItem extends IFocusParentNodeProps {
  /**
   * Компонент шапки аккордеона.
   */
  header: JSX.Element;
  /**
   * Компонент панели аккордеона.
   */
  panel: JSX.Element | JSX.Element[];
  /**
   * Признак открытости аккордеона.
   */
  isExpanded?: boolean;
  /**
   * Обработчик нажатия на шапку аккордеона.
   */
  expand?(): void;
}

/**
 * Компонент "Аккордеон".
 */
export const AccordionItem = forwardRef<Box, IAccordionItem>(
  ({ header, panel, expand, isExpanded = false, nodesIds: [nodeId, parentId] }, ref) => {
    const [isOpen, open] = useToggle(isExpanded);

    const panelRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(
      (e: React.SyntheticEvent) => {
        e.stopPropagation();
        expand ? expand() : open();
      },
      [expand, open]
    );

    const opened = useMemo(() => (expand ? isExpanded : isOpen), [expand, isExpanded, isOpen]);

    useEffect(() => {
      if (panelRef.current) {
        panelRef.current.style.height = opened ? 'auto' : '0px';
      }
    }, [opened]);

    return (
      <FocusNode ref={ref} preferBorder className={css.accordion} nodeId={nodeId} parentId={parentId} onClick={handleClick}>
        <Box aria-expanded={opened} data-action="switch-expanded" type="button">
          {header}
        </Box>
        <div ref={panelRef} className={css.panel} data-role="row-details" role="region">
          {panel}
        </div>
      </FocusNode>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';
