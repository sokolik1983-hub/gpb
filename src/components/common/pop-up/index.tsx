import type { FC, ReactInstance } from 'react';
import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { findDOMNode } from 'react-dom';
import { Container, CLOSE_REASON, Box } from '@platform/ui';

/** Параметр хука useMouseHandlers. */
export interface IUseMouseHandlers {
  /** Реф элемента, на базовый DOM-узел которого будут вешаться обработчики мыши. */
  ref: React.MutableRefObject<ReactInstance | null>;
  /** Обработчик события mouseenter. */
  onMouseEnter(): void;
  /** Обработчик события mouseleave.  */
  onMouseLeave(): void;
}

/** Вешает обработчики на на базовый DOM-узел элемента. */
export const useMouseHandlers = ({ ref, onMouseEnter, onMouseLeave }: IUseMouseHandlers) => {
  useLayoutEffect(() => {
    let rootElement: ReturnType<typeof findDOMNode>;

    if (ref.current) {
      rootElement = findDOMNode(ref.current);

      if (rootElement) {
        rootElement.addEventListener('mouseenter', onMouseEnter);
        rootElement.addEventListener('mouseleave', onMouseLeave);
      }
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener('mouseenter', onMouseEnter);
        rootElement.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [onMouseLeave, onMouseEnter, ref]);
};

/** Свойства компонента PopUpContainer. */
export interface IPopUpContainerProps {
  /** Обработчик события mouseenter. */
  onMouseEnter(): void;
  /** Обработчик события mouseleave. */
  onMouseLeave(): void;
}

/** Обёртка всплывающего окна.  */
export const PopUpContainer: FC<IPopUpContainerProps> = ({ onMouseLeave, onMouseEnter, children }) => {
  const ref = useRef<Box>(null);

  useMouseHandlers({ ref, onMouseLeave, onMouseEnter });

  return <Box ref={ref}>{children}</Box>;
};

PopUpContainer.displayName = 'PopUpContainer';

/** Свойства компонента PopUp. */
export interface IPopUpProps {
  /**
   * Дочерние компоненты элемента PopUp.
   *
   * Первый элемент массива - рендер функция, получает реф, который можно установить на элемент,
   * при наведении на который будет открываться всплывающее окно.
   *
   * Остальные элементы массива - содержимое всплывающего окна.
   */
  children: [renderTargetElement: (ref: React.RefObject<any>) => React.ReactNode, ...popUpContent: React.ReactNodeArray];
}

/**
 * Время после которого закроется всплывающее окно,
 * если увезти указатель мыши с триггерящего элемента,
 * или с самого всплывающего окна.
 */
const POP_UP_SHOWING_DELAY = 150; // ms

/** Рендерит элемент наведение на который тригерит всплывающее окно и само всплывающее окно. */
export const PopUp: FC<IPopUpProps> = ({ children }) => {
  const [renderTargetElement, ...popUpContent] = children;

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [shouldClosePopUp, setShouldClosePopUp] = useState<boolean>(true);

  const shouldClosePopUpRef = useRef<boolean>(shouldClosePopUp);

  const targetElementRef = useRef<ReactInstance>(null);

  const handleOnCLose = useCallback((reason: CLOSE_REASON) => {
    if (reason === CLOSE_REASON.SCROLLING) {
      setIsOpened(false);
    }
  }, []);

  const onMouseEnter = useCallback(() => {
    setShouldClosePopUp(false);
    shouldClosePopUpRef.current = false;

    setIsOpened(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setShouldClosePopUp(true);
    shouldClosePopUpRef.current = true;

    void new Promise<void>(resolve => {
      setTimeout(() => {
        if (shouldClosePopUpRef.current) {
          setIsOpened(false);
        }

        resolve();
      }, POP_UP_SHOWING_DELAY);
    });
  }, []);

  useMouseHandlers({ ref: targetElementRef, onMouseLeave, onMouseEnter });

  const anchorEl = findDOMNode(targetElementRef.current);

  return (
    <>
      {renderTargetElement(targetElementRef)}
      {anchorEl && popUpContent.length > 0 && (
        <Container
          disableOutsideClick
          anchorEl={anchorEl as HTMLElement} // Приведение по аналогии с платформой.
          disableCloseOnScrolling={false}
          offset={-2}
          opened={isOpened}
          positioningOrder={['BOTTOM_CENTER', 'TOP_CENTER']}
          onClose={handleOnCLose}
        >
          <PopUpContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {popUpContent}
          </PopUpContainer>
        </Container>
      )}
    </>
  );
};

PopUp.displayName = 'PopUp';
