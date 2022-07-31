import React, { useCallback, forwardRef, useRef, useEffect, useMemo } from 'react';
import type { IFocusParentNodeProps } from 'components/focus-tree';
import { FocusNode } from 'components/focus-tree';
import ResizeSensor from 'lib/resize-sensor';
import type { ResizeSensorClass } from '@platform/ui';
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
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(() => {
      expand ? expand() : open();
    }, [expand, open]);

    const opened = useMemo(() => (expand ? isExpanded : isOpen), [expand, isExpanded, isOpen]);

    useEffect(() => {
      let obs: ResizeSensorClass;

      const updateHeight = () => {
        if (wrapperRef.current && panelRef.current) wrapperRef.current.style.height = opened ? `${panelRef.current.clientHeight}px` : '0px';
      };

      /**
       * Подписываемся на изменение высоты панели.
       */
      if (panelRef.current) {
        obs = new ResizeSensor(panelRef.current, updateHeight);

        return () => {
          obs.detach(updateHeight);
        };
      }
    }, [opened]);

    return (
      <FocusNode ref={ref} preferBorder className={css.accordion} nodeId={nodeId} parentId={parentId} onClick={handleClick}>
        <Box aria-expanded={opened} data-action="switch-expanded" type="button">
          {header}
        </Box>
        <div ref={wrapperRef} className={css.panel} data-role="row-details" role="region">
          <div ref={panelRef}>{panel}</div>
        </div>
      </FocusNode>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';
