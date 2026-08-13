import type { ValidationErrors } from '@/types';

/**
 * APIエラーを表すクラス
 */
export class ApiError extends Error {
  /**
   * HTTPステータスコード
   */
  status: number;
  /**
   * バリデーションエラー
   * 401 / 403 などフィールド単位のエラーを持たないレスポンスでは存在しない
   */
  errors?: ValidationErrors;

  /**
   * ApiErrorのコンストラクタ
   * @param message エラーメッセージ
   * @param status HTTPステータスコード
   * @param errors バリデーションエラー
   */
  constructor(message: string, status: number, errors?: ValidationErrors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
