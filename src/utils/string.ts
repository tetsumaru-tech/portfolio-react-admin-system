/**
 * 指定された値が検索文字列に一致するかどうかをチェックします。
 * @param value - チェックする値
 * @param searchString - 検索文字列
 * @returns 一致する場合はtrue、そうでない場合はfalse
 */
export function isMatch(value: string, searchString: string): boolean {
  return (
    !searchString || value.toLowerCase().includes(searchString.toLowerCase())
  );
}
