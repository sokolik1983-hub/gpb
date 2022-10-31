import { createContext } from 'react';

/** Свойства конекста скроллера. */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ScrollerContextProps {}

/** Начальное значение контекста. */
const defaultValue: ScrollerContextProps = {};

/** Контекст скроллера. */
export const ScrollerContext = createContext<ScrollerContextProps>(defaultValue);

ScrollerContext.displayName = 'TurnoversScrollerContext';
