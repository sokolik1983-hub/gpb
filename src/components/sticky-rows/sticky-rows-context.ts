import type { RefObject } from 'react';
import { createContext } from 'react';
import type Scrollbars from 'react-custom-scrollbars';

/** Контекст содержащий необходимые данные, чтобы добавить строкам скроллера, стики поведение. */
export interface IStickyRowsContext {
  /** Реф элемента внутри которого рендерятся строки в состоянии стики. */
  portalRef: RefObject<HTMLDivElement>;
  /** Рефы на элементы представляющие строки группировки первого уровня. */
  firstLevelRows: Array<RefObject<HTMLDivElement>>;
  /** Устанавливает массив рефов на элементы представляющие строки группировки первого уровня. */
  setFirstLevelRows(value: (prev: Array<RefObject<HTMLDivElement>>) => Array<RefObject<HTMLDivElement>>): void;
  /** Рефы на элементы представляющие строки группировки второго уровня. */
  secondLevelRows: Array<RefObject<HTMLDivElement>>;
  /** Устанавливает массив рефов на элементы представляющие строки группировки второго уровня. */
  setSecondLevelRows(value: (prev: Array<RefObject<HTMLDivElement>>) => Array<RefObject<HTMLDivElement>>): void;
  /** Отрендеренный компонент скролбара, (ссылка на экземпляр классового компонента). */
  scrollbars?: Scrollbars;
  /** Устанавливает компонент скролбара. */
  setScrollbars(value: Scrollbars): void;
  /* Позиция скрола. */
  scrollPosition: number;
  /* Устанавливает текущую позицию скрола. */
  setScrollPosition(value: number): void;
}

export const StickyRowsContext = createContext<IStickyRowsContext>((undefined as unknown) as IStickyRowsContext);
