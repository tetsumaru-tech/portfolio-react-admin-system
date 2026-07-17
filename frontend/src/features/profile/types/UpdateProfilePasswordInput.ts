import type { ProfilePasswordFormData } from '@/features/profile/types';

/**
 * プロファイル更新時にAPIへ送信するデータの型
 * @remarks
 * - 更新は部分的に行うため、すべてのフィールドがオプショナルになります。
 */
export type UpdateProfilePasswordInput = Partial<ProfilePasswordFormData>;
