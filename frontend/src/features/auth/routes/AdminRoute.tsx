import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { useAuth } from '@/features/auth/hooks';

/**
 * 管理者専用ルート
 * - 未ログインの場合はログインページへリダイレクト
 * - 管理者以外の場合はホームへリダイレクト
 * - 管理者の場合は子ルートをレンダリング
 */
export function AdminRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={ROUTES.login()} replace />;
  }
  if (user.role !== 'admin') {
    return <Navigate to={ROUTES.top()} replace />;
  }
  return <Outlet />;
}
