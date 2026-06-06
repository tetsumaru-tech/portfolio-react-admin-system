import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import { authApi } from '@/features/auth/api';
import type { AuthUser } from '@/features/auth/types';

type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoading: boolean;
};

/**
 * 認証コンテキスト
 * ユーザーの認証状態とログイン・ログアウト関数を提供するためのReactコンテキストです。
 */
export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

/**
 * 認証コンテキストプロバイダーコンポーネント
 * @param children - コンテキストを提供する子コンポーネント
 * @returns 認証コンテキストプロバイダーでラップされた子コンポーネント
 */
export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authUser = await authApi.me();
        setUser(authUser);
      } catch (error) {
        console.error('ユーザー情報の取得に失敗:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
