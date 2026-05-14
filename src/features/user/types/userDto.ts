import type { UserFormData } from './UserFormData';

/**
 * APIとのやりとりで使用するユーザーデータの型定義
 * - CreateUserInput: ユーザー作成時に必要なデータの型
 */
export type CreateUserInput = Omit<UserFormData, 'id'>;

/**
 * APIとのやりとりで使用するユーザーデータの型定義
 * - UpdateUserInput: ユーザー更新時に必要なデータの型（すべてのフィールドがオプショナル）
 */
export type UpdateUserInput = Partial<Omit<UserFormData, 'id'>>;
