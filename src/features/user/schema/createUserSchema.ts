import { z } from 'zod';

import { userBaseSchema } from './userBaseSchema';

/**
 * ユーザー作成リクエストのスキーマ定義
 * userBaseSchemaをベースに、ユーザー作成時の入力値を検証します
 */
export const createUserSchema = z.object({ ...userBaseSchema });

/**
 * ユーザー作成リクエストの型定義
 * createUserSchemaから推論される型です
 */
export type CreateUserRequest = z.infer<typeof createUserSchema>;
