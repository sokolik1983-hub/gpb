import React, { useCallback, useContext, forwardRef, useRef, useEffect, useMemo } from 'react';
import ResizeSensor from 'lib/resize-sensor';
import type { ResizeSensorClass } from '@platform/ui';
import { useToggle, Box } from '@platform/ui';
import { AccordionContext } from './accordion-group';
import css from './styles.scss';
/**
 * Свойства компонента "Аккордеон".
 */
interface IAccordionItem {
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
export const AccordionItem = forwardRef<Box, IAccordionItem>(({ header, panel, expand, isExpanded = false }, ref) => {
  const [isOpen, open] = useToggle(isExpanded);
  const { disabled } = useContext(AccordionContext);

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
    <Box ref={ref} className={css.accordion}>
      <button aria-expanded={opened} tabIndex={disabled ? -1 : 0} type="button" onClick={handleClick}>
        {header}
      </button>
      <div ref={wrapperRef} className={css.panel} role="region">
        <div ref={panelRef}>{panel}</div>
      </div>
    </Box>
  );
});

AccordionItem.displayName = 'AccordionItem';
