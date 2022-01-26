import { useEffect, useRef } from 'react';

/**
 * Возвращает значение переданное при предыдущем вызове.
 *
 * @param value - Значение, которое надо кешировать.
 * @returns - Значение которое было передано на предыдущем вызове.
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
