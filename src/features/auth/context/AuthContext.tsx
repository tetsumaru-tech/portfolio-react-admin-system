import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { AuthUser } from '@/features/auth/types';

type AuthContextType = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
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

  function login(user: AuthUser) {
    setUser(user);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
