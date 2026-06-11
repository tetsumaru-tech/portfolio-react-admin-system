import { z } from 'zod';

import { userBaseSchema } from './userBaseSchema';

import { USER_FORM_MIN_LENGTH } from '@/features/user/constants';

/**
 * ユーザー編集フォーム用の Zod スキーマ
 *
 * userBaseSchema を展開して、フォームで使用するバリデーション定義を作成します。
 */
export const userFormSchema = z
  .object({
    ...userBaseSchema,
    id: z.number().nullable(),
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
