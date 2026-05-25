import type { UserFormData } from './UserFormData';

/**
 * 新規ユーザー作成時にAPIへ送信するデータの型
 * @remarks
 * - UserFormData の 'id' フィールドを除外した型です。
 * - フロントエンドのフォーム入力値をそのまま API に渡す用途で使います。
 */
export type CreateUserInput = Omit<UserFormData, 'id'>;

/**
 * ユーザー更新時にAPIへ送信するデータの型
 * @remarks
 * - 更新は部分的に行うため、すべてのフィールドがオプショナルになります。
 * - 'id' フィールドは除外されています（更新対象のユーザーIDは別途指定される想定）。
 */
export type UpdateUserInput = Partial<Omit<UserFormData, 'id'>>;
