import { z } from 'zod';

import { profileSchema } from '@/features/profile/schema';

/**
 * プロフィールフォームの入力データ型。
 * Zod スキーマ `profileSchema` から推論されます。
 */
export type ProfileFormData = z.infer<typeof profileSchema>;
