import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks';

/**
 * 認証が必要なルートを保護するコンポーネント
 * @returns 認証されたユーザーのみがアクセスできるコンポーネント
 */
export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
