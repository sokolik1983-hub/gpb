import { useEffect, useState, useRef } from 'react';
import isEqual from 'fast-deep-equal';

/**
 * Копии платформенных хуков с исправлениями багов в стриме.
 */

/**
 * Хук для получения предыдущего переданного значения.
 *
 * @param value - Изменяющееся значение.
 */
const usePrevious = <T>(value: T): T => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current as T;
};

/**
 * Позволяет применить debounce к быстроменяющемуся значению.
 * Возвращаемое значение `value` будет получено, только по истечению времени,
 * указанному в параметре `delay`.
 *
 * @param value - Изменяющееся значение.
 * @param delay - Задержка изменения значения в мс.
 *
 * Решена проблема платформенного `useDebounce` при передаче в качестве `value` объекта, текущая реализация
 * успешно работает и с примитивами.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const prevValue = usePrevious<T>(value);
  const timeoutID = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (prevValue && !isEqual(value, prevValue)) {
      if (timeoutID.current) {
        clearTimeout(timeoutID.current);
      }

      timeoutID.current = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    }
  }, [value, delay, prevValue]);

  return debouncedValue;
};
