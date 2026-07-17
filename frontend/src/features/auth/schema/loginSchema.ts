import { z } from 'zod';

/**
 * ログインフォームのバリデーションスキーマ
 *
 * - email: 必須、メールアドレス形式であること
 * - password: 必須（空文字不可）
 */
export const loginSchema = z.object({
  email: z.string().email('メールアドレス形式が不正です'),
  password: z.string().min(1, 'パスワードは必須です'),
});

/**
 * ログインフォームの入力型
 */
export type LoginFormData = z.infer<typeof loginSchema>;
