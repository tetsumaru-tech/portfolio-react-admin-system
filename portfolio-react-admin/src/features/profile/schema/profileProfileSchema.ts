import { z } from 'zod';

import { USER_FORM_MIN_LENGTH } from '@/features/user/constants';
/**
 * プロフィールのパスワード更新フォームのバリデーションスキーマ
 *
 * @property password - 新しいパスワード
 * @property passwordConfirmation - 新しいパスワードの確認入力
 */
export const profilePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '現在のパスワードは必須です'),
    password: z
      .string()
      .min(
        USER_FORM_MIN_LENGTH.password,
        `パスワードは${USER_FORM_MIN_LENGTH.password}文字以上です`,
      ),
    passwordConfirmation: z.string().min(1, '確認用パスワードは必須です'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'パスワードが一致しません',
  });
