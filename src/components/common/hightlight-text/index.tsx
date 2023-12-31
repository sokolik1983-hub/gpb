import React, { useMemo } from 'react';
import type { IWebBoxProps } from '@platform/ui';
import { Box } from '@platform/ui';

/**
 * Свойства компонента "Выделенный текст".
 */
interface IHighlightedText extends Omit<IWebBoxProps, 'className'> {
  /**
   * Класс для стилизации подсветки текста.
   */
  highlightClassName?: string;
  /**
   * Свойства шрифта выделенного текста.
   */
  fontProps?: React.HTMLAttributes<HTMLSpanElement>;
}

/**
 * Компонент "Выделенный текст".
 */
const HighlightedText: React.FC<IHighlightedText> = ({ highlightClassName, children, fontProps, ...boxProps }) => (
  <Box inverse className={highlightClassName} fill="ACCENT" style={{ display: 'inline-block' }} {...boxProps}>
    <span {...fontProps} style={{ color: 'white' }}>
      {children}
    </span>
  </Box>
);

HighlightedText.displayName = 'HighlightedText';

/**
 * Свойства компонента "Текст с подсветкой".
 */
interface IHightlightText extends Omit<IWebBoxProps, 'className'> {
  /**
   * Строка, в которой происходит выделение текста.
   */
  textToHightlight: string;
  /**
   * Строка поиска символов для подсветки.
   */
  searchWords?: string;
  /**
   * Класс для стилизации подсветки текста.
   */
  highlightClassName?: string;
  /**
   * Свойства шрифта выделенного текста.
   */
  fontProps?: React.HTMLAttributes<HTMLSpanElement>;
}

/**
 * Компонента "Текст с подсветкой".
 */
export const HightlightText: React.FC<IHightlightText> = ({
  textToHightlight,
  searchWords,
  highlightClassName,
  fontProps,
  ...boxProps
}) => {
  const defaultResult = useMemo(() => <div style={{ display: 'inline' }}>{textToHightlight}</div>, [textToHightlight]);

  if (!searchWords || !textToHightlight) {
    return defaultResult;
  }

  const index = String(textToHightlight).toLowerCase().indexOf(searchWords.toLowerCase().trimEnd());

  // Если совпадение найдено
  if (index !== -1) {
    const lastIndex = index + searchWords.trimEnd().length;
    const startText = String(textToHightlight).slice(0, index);
    const endText = String(textToHightlight).slice(lastIndex);
    const hightlighted = String(textToHightlight).slice(index, lastIndex);

    return (
      <span>
        {startText}
        <HighlightedText fontProps={fontProps} highlightClassName={highlightClassName} {...boxProps}>
          {hightlighted}
        </HighlightedText>
        {endText}
      </span>
    );
  }

  return defaultResult;
};

HightlightText.displayName = 'HightlightText';
