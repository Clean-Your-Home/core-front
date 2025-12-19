import { useEffect, useRef, useState } from 'react';

import { useDebounceCallback } from '../useDebounceCallback';

/**
 * @name useDebounceValue
 * @description - Hook that creates a debounced value
 * @param value - The value to be debounced
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 */
export const useDebounceValue = <T,>(value: T, delay: number): T => {
  const previousValueRef = useRef<T>(value);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncedSetState = useDebounceCallback(setDebouncedValue, delay);

  useEffect(() => {
    if (previousValueRef.current === value) return;
    debouncedSetState(value);
    previousValueRef.current = value;
  }, [value, debouncedSetState]);

  return debouncedValue;
};
