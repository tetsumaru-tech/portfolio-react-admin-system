/**
 * ユーザー関連のクエリキー定義
 */
export const userQueryKeys = {
  all: ['users'] as const,
  detail: (id: number) => ['user', id] as const,
};
