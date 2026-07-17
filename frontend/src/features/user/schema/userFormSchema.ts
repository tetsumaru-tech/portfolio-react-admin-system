import { z } from 'zod';

import { PASSWORD_PATTERN } from '@/features/user/constants';
import { USER_FORM_MIN_LENGTH } from '@/features/user/constants';
import { userBaseSchema } from '@/features/user/schema';

/**
 * ユーザー編集フォーム用の Zod スキーマ
 *
 * userBaseSchema を展開して、フォームで使用するバリデーション定義を作成します。
 */
export const userFormSchema = z
  .object({
    ...userBaseSchema,
    id: z.number().nullable(),
    password: z
      .string()
      .regex(PASSWORD_PATTERN, '大文字・小文字・数字を含めてください')
      .optional(),
    passwordConfirmation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isCreate = data.id === null || data.id === 0;
    if (!isCreate) {
      return;
    }
    if (!data.password) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'パスワードは必須です',
      });
    }

    if (!data.passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: '確認用パスワードは必須です',
      });
    }

    if (data.password && data.password.length < USER_FORM_MIN_LENGTH.password) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: `パスワードは${USER_FORM_MIN_LENGTH.password}文字以上です`,
      });
    }

    if (
      data.password &&
      data.passwordConfirmation &&
      data.password !== data.passwordConfirmation
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: 'パスワードが一致しません',
      });
    }
  });
