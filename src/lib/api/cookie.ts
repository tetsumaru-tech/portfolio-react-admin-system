import { getCookie } from '@/utils';

/**
 * XSRFトークンを取得する関数
 * @returns XSRFトークン
 */
export function getXsrToken(): string {
  return decodeURIComponent(getCookie('XSRF-TOKEN') ?? '');
}
