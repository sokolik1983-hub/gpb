import { noop } from './common';

/**
 * Принимает функцию-обработчик события и возвращает ее же или функцию заглушку, если в документе что-то выделено мышкой
 * Используется в основном для обработчика клика по строке таблицы.
 */
export const getHandlerDependingOnSelection = <T extends (...args: any[]) => any>(handler: T): T => {
  const { isCollapsed } = document.getSelection() || {};

  return isCollapsed || isCollapsed === undefined ? handler : (noop as T);
};
