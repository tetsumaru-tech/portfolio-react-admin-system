/**
 * ユーザーフォームの入力制限を定義する定数
 * @description 各フィールドの最大文字数を定義しています。
 * @remarks バリデーションルールは userFormRows.ts に記載されているため、ここでは定義しません。
 */
export const USER_FORM_LIMITS = {
  lastName: 10,
  firstName: 10,
  email: 100,
} as const;

/**
 * ユーザーフォームの最小文字数制限を定義する定数
 * @description パスワード入力時の最小文字数要件を指定しています。
 */
export const USER_FORM_MIN_LENGTH = {
  password: 8,
} as const;

export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
