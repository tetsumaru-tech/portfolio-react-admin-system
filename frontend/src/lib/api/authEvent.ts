/**
 * ログアウト時のオプション
 */
export type LogoutOptions = {
  callApi?: boolean;
};

let unauthorizedHandler: ((options?: LogoutOptions) => void) | null = null;

/**
 * 認証エラー時のハンドラーを設定します。
 * @param handler - 認証エラー発生時に呼び出される関数
 */
export function setUnauthorizedHandler(
  handler: (options?: LogoutOptions) => void,
) {
  unauthorizedHandler = handler;
}

/**
 * 認証エラーを通知し、登録されたハンドラーを実行します。
 */
export function notifyUnauthorized() {
  unauthorizedHandler?.({ callApi: false });
}
