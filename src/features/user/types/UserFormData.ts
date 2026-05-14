import { z } from 'zod';

import { userSchema } from '@/features/user/schema';

/**
 * ユーザー情報のフォームデータの型定義
 */
export type UserFormData = z.infer<typeof userSchema>;
