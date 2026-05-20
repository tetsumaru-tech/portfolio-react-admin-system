import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastProvider } from '@/components';
import { ROUTEPATTERNS } from '@/constants';
import {
  UserListPage,
  UserDetailPage,
  UserEditPage,
  UserConfirmPage,
} from '@/features/user/pages';
import { AppErrorFallback, NotFoundPage } from '@/pages/error';

/**
 * アプリケーションのルーティングとトースト提供を設定するコンポーネントです。
 * 各ページコンポーネントへのパスを定義します。
 */
export default function App() {
  return (
    <ErrorBoundary FallbackComponent={AppErrorFallback}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
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
            <Route path={ROUTEPATTERNS.USER_EDIT} element={<UserEditPage />} />
            <Route
              path={ROUTEPATTERNS.USER_CONFIRM}
              element={<UserConfirmPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}
