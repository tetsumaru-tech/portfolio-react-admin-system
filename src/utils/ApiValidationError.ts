import { ApiError } from '@/utils';

/**
 * APIのバリデーションエラーを表すクラス
 * バリデーションエラーは通常、HTTPステータスコード422で返されるエラーを表します。
 * ApiErrorを継承しており、追加のプロパティやメソッドを必要に応じて実装できます。
 */
export class ApiValidationError extends ApiError {}
