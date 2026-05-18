import { z } from 'zod';

import { userBaseSchema } from './userBaseSchema';

/**
 * ユーザー編集フォーム用の Zod スキーマ
 *
 * userBaseSchema を展開して、フォームで使用するバリデーション定義を作成します。
 */
export const userFormSchema = z.object({
  ...userBaseSchema,
  id: z.number().nullable(),
});
