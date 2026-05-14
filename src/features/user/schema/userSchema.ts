import { z } from 'zod';

/**
 * ユーザー情報のバリデーションスキーマ
 */
export const userSchema = z.object({
  id: z.number().nullable(),
  lastName: z.string().min(1, '姓は必須です').max(10, '姓は10文字以内です'),
  firstName: z.string().min(1, '名は必須です').max(10, '名は10文字以内です'),
  email: z.email('メール形式が不正です').max(100, 'メールは100文字以内です'),
  birthday: z.string(),
  gender: z.enum(['male', 'female', '']),
});
