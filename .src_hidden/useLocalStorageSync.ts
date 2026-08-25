import { useState, useEffect, useCallback } from 'react';

/**
 * Enterprise-grade hook for cross-tab local storage synchronization.
 */
export function useLocalStorageSync<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Prevent SSR hydration mismatch by initializing with initialValue on server
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Hydrate state from local storage on mount
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }

    // Listen for cross-tab synchronization
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error(`Error parsing StorageEvent for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}
