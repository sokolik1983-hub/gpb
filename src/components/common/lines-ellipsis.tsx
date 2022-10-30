import React, { useEffect, useRef, useState } from 'react';
import clamp from 'clamp-js-main';
import { Box } from '@platform/ui';

/** Свойства компонента для обрезания содержимого элемента. */
interface LinesEllipsisProps {
  /** Функция, возвращающая элемент для обрезания содержимого. */
  children(ref: React.Ref<HTMLDivElement>, clamped?: boolean): React.ReactNode;
  /** Максимальное количество строк для отображения без обрезки. */
  maxLines: number;
}

/** Обрезает содержимое переданного элемента, добавляя к нему многоточие. */
export const LinesEllipsis: React.FC<LinesEllipsisProps> = ({ children, maxLines }) => {
  const [clamped, setClamped] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      clamp(ref.current, { clamp: maxLines, useNativeClamp: false });

      const textContent = ref.current.innerText;

      if (textContent.match(/…$/)) {
        setClamped(true);
      }
    }
  }, [children, maxLines, setClamped]);

  return <Box>{children(ref, clamped)}</Box>;
};

LinesEllipsis.displayName = 'LinesEllipsis';
