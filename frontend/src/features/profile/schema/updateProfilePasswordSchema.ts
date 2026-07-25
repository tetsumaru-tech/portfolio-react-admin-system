import { z } from 'zod';

import { profilePasswordSchema } from '@/features/profile/schema';

/**
 * プロフィール更新リクエストのスキーマ定義
 * userBaseSchemaをベースに、全てのフィールドをオプショナルにしたスキーマ
 */
export const updateProfilePasswordSchema = z.object({
  profilePasswordSchema,
});
/**
 * プロフィール更新リクエストの型
 * updateProfileSchemaから推論される型定義
 */
export type UpdateProfilePasswordRequest = z.infer<
  typeof updateProfilePasswordSchema
>;
