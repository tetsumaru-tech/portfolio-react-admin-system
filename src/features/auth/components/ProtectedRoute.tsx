import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks';

type Props = {
  children: ReactNode;
};

/**
 * 認証が必要なルートを保護するコンポーネント
 * @param children - ルートの子コンポーネント
 * @returns 認証されたユーザーのみがアクセスできるコンポーネント
 */
export function ProtectedRoute({ children }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
