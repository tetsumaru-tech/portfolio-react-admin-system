import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { Loading } from '@/components/feedback';
import { useAuth } from '@/features/auth/hooks';

/**
 * 認証が必要なルートを保護するコンポーネント
 * @returns 認証されたユーザーのみがアクセスできるコンポーネント
 */
export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
