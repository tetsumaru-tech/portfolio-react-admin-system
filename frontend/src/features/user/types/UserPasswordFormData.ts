import { z } from 'zod';

import { userPasswordSchema } from '@/features/user/schema';

/**
 * ユーザーのパスワードフォームデータの型定義
 */
export type UserPasswordFormData = z.infer<typeof userPasswordSchema>;
