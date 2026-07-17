import { useEffect, useState } from 'react';

/**
 * 値を指定された遅延時間でデバウンスするカスタムフック
 * このフックは、入力値の変更を遅延させるために使用されます。ユーザーが入力を停止してから指定された時間が経過するまで、値の更新を遅らせます。
 * @param value - デバウンスする値
 * @param delay - デバウンスの遅延時間（ミリ秒単位、デフォルトは500ms）
 * @returns デバウンスされた値
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
