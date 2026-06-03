import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
