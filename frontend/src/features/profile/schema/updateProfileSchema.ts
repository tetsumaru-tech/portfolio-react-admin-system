import { z } from 'zod';

import { userBaseSchema } from '@/features/user/schema';

/**
 * プロフィール更新リクエストのスキーマ定義
 * userBaseSchemaをベースに、全てのフィールドをオプショナルにしたスキーマ
 */
export const updateProfileSchema = z
  .object({ ...userBaseSchema, id: z.number() })
  .partial();

/**
 * プロフィール更新リクエストの型
 * updateProfileSchemaから推論される型定義
 */
export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;
