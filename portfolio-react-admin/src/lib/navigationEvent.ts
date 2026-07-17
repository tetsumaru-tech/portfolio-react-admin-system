let forbiddenHandler: (() => void) | null = null;

/**
 * 403発生時のハンドラを登録する
 */
export function setForbiddenHandler(handler: () => void) {
  forbiddenHandler = handler;
}

/**
 * 403発生を通知する
 */
export function notifyForbidden() {
  forbiddenHandler?.();
}
