import { z } from 'zod';

import { profilePasswordSchema } from '@/features/profile/schema';

/**
 * プロファイル更新リクエストのスキーマ定義
 * userBaseSchemaをベースに、全てのフィールドをオプショナルにしたスキーマ
 */
export const updateProfilePasswordSchema = z.object({
  profilePasswordSchema,
});
/**
 * プロファイル更新リクエストの型
 * updateProfileSchemaから推論される型定義
 */
export type UpdateProfilePasswordRequest = z.infer<
  typeof updateProfilePasswordSchema
>;
