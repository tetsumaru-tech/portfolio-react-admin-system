import type { ReactNode } from 'react';
import { createContext, useCallback, useEffect, useState } from 'react';

import { authApi } from '@/features/auth/api';
import type { AuthUser } from '@/features/auth/types';
import { setUnauthorizedHandler, type LogoutOptions } from '@/lib/api';

type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoading: boolean;
  logout: (options?: LogoutOptions) => Promise<void>;
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
  const logout = useCallback(async ({ callApi = true }: LogoutOptions = {}) => {
    try {
      if (callApi) {
        await authApi.logout();
      }
    } finally {
      setUser(null);
    }
  }, []);

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

  useEffect(() => {
    setUnauthorizedHandler(logout);
    return () => {
      setUnauthorizedHandler(() => {});
    };
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
