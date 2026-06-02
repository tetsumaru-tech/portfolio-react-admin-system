import { useContext } from 'react';

import { AuthContext } from '@/features/auth/context';

/**
 * 認証コンテキストを使用するためのカスタムフック
 * @returns 認証コンテキストの値
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider not found');
  }
  return context;
}
