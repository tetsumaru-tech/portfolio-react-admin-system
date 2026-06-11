import { z } from 'zod';

import { USER_FORM_LIMITS, PASSWORD_PATTERN } from '@/features/user/constants';
import { GENDERS } from '@/features/user/types';

export const userBaseSchema = {
  // id: z.number().nullable(),
  lastName: z
    .string()
    .min(1, '姓は必須です')
    .max(USER_FORM_LIMITS.lastName, '姓は{value}文字以内です'),
  firstName: z
    .string()
    .min(1, '名は必須です')
    .max(USER_FORM_LIMITS.firstName, '名は{value}文字以内です'),
  email: z
    .email('メール形式が不正です')
    .max(USER_FORM_LIMITS.email, 'メールは{value}文字以内です'),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日付形式が不正です'),
  gender: z.enum(GENDERS, '性別は必須です'),
  password: z
    .string()
    .regex(PASSWORD_PATTERN, '大文字・小文字・数字を含めてください')
    .optional(),
  passwordConfirmation: z.string().optional(),
};
