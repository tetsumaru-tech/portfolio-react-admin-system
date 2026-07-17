import type { SetURLSearchParams } from 'react-router-dom';

/**
 * URLSearchParamsを更新するユーティリティ関数
 * URLSearchParamsを部分的に更新するための関数です。既存のパラメータを保持しつつ、指定されたキーと値で更新します。
 * 値がundefinedまたは空文字の場合、そのキーはURLSearchParamsから削除されます。
 *
 * @param setSearchParams - URLSearchParamsを更新するための関数（useSearchParamsから取得）
 * @param updates - 更新するキーと値のペアを含むオブジェクト
 * @return URLSearchParamsを更新するための関数
 */
export function updateSearchParams(
  setSearchParams: SetURLSearchParams,
  updates: Record<string, string | number | null | undefined>,
) {
  setSearchParams((prev) => {
    const newParams = new URLSearchParams(prev);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '' || value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });
    return newParams;
  });
}
