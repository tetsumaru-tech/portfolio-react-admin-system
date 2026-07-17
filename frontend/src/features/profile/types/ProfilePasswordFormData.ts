import { z } from 'zod';

import { profilePasswordSchema } from '@/features/profile/schema';

/**
 * パスワードのパスワードフォームデータの型定義
 */
export type ProfilePasswordFormData = z.infer<typeof profilePasswordSchema>;
