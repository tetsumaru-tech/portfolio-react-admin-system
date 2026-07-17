import { z } from 'zod';

import { USER_FORM_MIN_LENGTH } from '@/features/user/constants';

/**
 * ユーザーのパスワード更新フォームのバリデーションスキーマ
 *
 * @property password - 新しいパスワード
 * @property passwordConfirmation - 新しいパスワードの確認入力
 */
export const userPasswordSchema = z
  .object({
    password: z
      .string()
      .min(
        USER_FORM_MIN_LENGTH.password,
        `パスワードは${USER_FORM_MIN_LENGTH.password}文字以上です`,
      ),
    passwordConfirmation: z.string().min(1, '確認用パスワードは必須です'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: 'パスワードが一致しません',
      });
    }
  });
