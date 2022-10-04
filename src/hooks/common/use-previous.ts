import { useEffect, useRef } from 'react';

/**
 * Возвращает значение переданное при предыдущем вызове.
 *
 * @param value - Значение, которое надо кешировать.
 * @param shouldSkip - Указывает надо ли пропустить кеширование. Если труе, то кеширование пропускается.
 * @returns - Значение которое было передано на предыдущем вызове.
 */
export const usePrevious = <T>(value: T, shouldSkip?: boolean): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    if (!shouldSkip) {
      ref.current = value;
    }
  }, [shouldSkip, value]);

  return ref.current;
};
