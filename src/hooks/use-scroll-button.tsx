import React, { useCallback, useState, useRef } from 'react';
import type Scrollbars from 'react-custom-scrollbars';
import { ServiceIcons } from '@platform/ui';

/** Направления прокрутки. */
export enum SCROLL_DIRECTIONS {
  /** Вверх. */
  TOP = 'TOP',
  /** Вниз. */
  DOWN = 'DOWN',
}

/** Смещение при котором кнопка становится прокрутки видна. */
const OFFSET_WHEN_BUTTON_VISIBLE = 40;

/** Возвращает данные для кнопки прокрутки. */
export const useScrollButton = () => {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  // В каком направлении при нажатии на кнопку прокрутки будет прокручиваться содержимое элемента.
  const [scrollDirection, setScrollDirection] = useState<SCROLL_DIRECTIONS>();

  const ScrollIcon = scrollDirection === SCROLL_DIRECTIONS.TOP ? ServiceIcons.ArrowUp : ServiceIcons.ArrowDown;

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    // При определённой прокрутке, появляется кнопка скроллинга.
    setIsScrollButtonVisible(scrollTop > OFFSET_WHEN_BUTTON_VISIBLE);

    // Направление прокрутки, меняется на противоположное,
    // когда элемент прокручивается до низа.
    setScrollDirection(
      scrollTop + clientHeight + OFFSET_WHEN_BUTTON_VISIBLE > scrollHeight ? SCROLL_DIRECTIONS.TOP : SCROLL_DIRECTIONS.DOWN
    );
  }, []);

  // Ref компонента который прокручивается.
  const scrolledElementRef = useRef<Scrollbars | null>(null);

  const setScrolledElementRef = useCallback(ref => {
    scrolledElementRef.current = ref;
  }, []);

  const handleScrollButtonClick = React.useCallback(() => {
    const action =
      scrollDirection === SCROLL_DIRECTIONS.TOP ? scrolledElementRef.current?.scrollToTop : scrolledElementRef.current?.scrollToBottom;

    if (action) {
      action();
    }
  }, [scrollDirection]);

  return {
    isScrollButtonVisible,
    ScrollIcon,
    handleScroll,
    setScrolledElementRef,
    handleScrollButtonClick,
  };
};
