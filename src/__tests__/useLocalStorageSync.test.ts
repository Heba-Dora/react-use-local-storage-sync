import { renderHook, act } from '@testing-library/react';
import { useLocalStorageSync } from '../useLocalStorageSync';

describe('useLocalStorageSync', () => {
  beforeEach(() => {
    // Clear local storage mock before each test
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('should initialize with the default value', () => {
    const { result } = renderHook(() => useLocalStorageSync('testKey', 'defaultValue'));
    expect(result.current[0]).toBe('defaultValue');
  });

  it('should be safe to use in SSR environments without window', () => {
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;
    
    expect(() => {
      renderHook(() => useLocalStorageSync('ssrKey', 'ssrValue'));
    }).not.toThrow();
    
    global.window = originalWindow;
  });
});
