import { z } from 'zod';

import { userBaseSchema } from '@/features/user/schema';

/**
 * ユーザー更新リクエストのスキーマ定義
 * userBaseSchemaをベースに、全てのフィールドをオプショナルにしたスキーマ
 */
export const updateUserSchema = z
  .object({ ...userBaseSchema, id: z.number() })
  .partial();

/**
 * ユーザー更新リクエストの型
 * updateUserSchemaから推論される型定義
 */
export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
