/**
 * ユーザーフォームの入力制限を定義する定数
 * ここでは、各フィールドの最大文字数を定義しています。
 * バリデーションルールは userFormRows.ts に記載されているため、ここでは定義しません。
 */
export const USER_FORM_LIMITS = {
  lastName: 10,
  firstName: 10,
  email: 100,
} as const;
