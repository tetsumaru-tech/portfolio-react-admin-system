import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastProvider } from '@/components';
import { ROUTEPATTERNS } from '@/constants';
import { ProtectedRoute } from '@/features/auth/components';
import { AuthProvider } from '@/features/auth/context';
import { LoginPage } from '@/features/auth/pages';
import {
  UserListPage,
  UserDetailPage,
  UserEditPage,
  UserConfirmPage,
} from '@/features/user/pages';
import { MainLayout } from '@/layouts';
import { AppErrorFallback, NotFoundPage } from '@/pages';

/**
 * アプリケーションのルーティングとトースト提供を設定するコンポーネントです。
 * 各ページコンポーネントへのパスを定義します。
 */
export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={AppErrorFallback}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path={ROUTEPATTERNS.HOME} element={<UserListPage />} />
                <Route path={ROUTEPATTERNS.USERS} element={<UserListPage />} />
                <Route
                  path={ROUTEPATTERNS.USER_DETAIL}
                  element={<UserDetailPage />}
                />
                <Route
                  path={ROUTEPATTERNS.USER_CREATE}
                  element={<UserEditPage />}
                />
                <Route
                  path={ROUTEPATTERNS.USER_EDIT}
                  element={<UserEditPage />}
                />
                <Route
                  path={ROUTEPATTERNS.USER_CONFIRM}
                  element={<UserConfirmPage />}
                />
              </Route>
              <Route element={<MainLayout />}>
                <Route path={ROUTEPATTERNS.LOGIN} element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
