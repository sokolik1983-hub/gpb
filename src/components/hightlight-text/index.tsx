import React, { useMemo } from 'react';
import type { IWebFontProps, IWebBoxProps } from '@platform/ui';
import { Box, Font } from '@platform/ui';

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
  fontProps?: IWebFontProps;
}

/**
 * Компонент "Выделенный текст".
 */
const HighlightedText: React.FC<IHighlightedText> = ({ highlightClassName, children, fontProps, ...boxProps }) => (
  <Box inverse className={highlightClassName} fill="ACCENT" style={{ display: 'inline-block' }} {...boxProps}>
    <Font inline {...fontProps}>
      {children}
    </Font>
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
  fontProps?: IWebFontProps;
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
  const defaultResult = useMemo(() => <span>{textToHightlight}</span>, [textToHightlight]);

  if (!searchWords) {
    return defaultResult;
  }

  const index = textToHightlight.toLowerCase().indexOf(searchWords.toLowerCase().trimEnd());

  // Если совпадение найдено
  if (index !== -1) {
    const lastIndex = index + searchWords.trimEnd().length;
    const startText = textToHightlight.slice(0, index);
    const endText = textToHightlight.slice(lastIndex);
    const hightlighted = textToHightlight.slice(index, lastIndex);

    return (
      <>
        {startText}
        <HighlightedText fontProps={fontProps} highlightClassName={highlightClassName} {...boxProps}>
          {hightlighted}
        </HighlightedText>
        {endText}
      </>
    );
  }

  return defaultResult;
};

HightlightText.displayName = 'HightlightText';
