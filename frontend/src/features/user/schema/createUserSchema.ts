import { z } from 'zod';

import { USER_FORM_MIN_LENGTH } from '@/features/user/constants';
import { userBaseSchema } from '@/features/user/schema/userBaseSchema';

/**
 * ユーザー作成リクエストのスキーマ定義
 * userBaseSchemaをベースに、ユーザー作成時の入力値を検証します
 */
export const createUserSchema = z
  .object({
    ...userBaseSchema,
    password: z
      .string()
      .min(
        USER_FORM_MIN_LENGTH.password,
        `パスワードは${USER_FORM_MIN_LENGTH.password}文字以上です`,
      ),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'パスワードが一致しません',
  });

/**
 * ユーザー作成リクエストの型定義
 * createUserSchemaから推論される型です
 */
export type CreateUserRequest = z.infer<typeof createUserSchema>;
