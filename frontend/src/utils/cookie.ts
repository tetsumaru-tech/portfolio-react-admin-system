/**
 * クッキーから指定された名前の値を取得する関数
 * @param name クッキーの名前
 * @returns クッキーの値、存在しない場合はnull
 */
export function getCookie(name: string): string | null {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return cookie.substring(name.length + 1);
}
