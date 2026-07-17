import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';

import { ToastProvider } from '@/components';
import { AuthProvider } from '@/features/auth/context';
import { AppErrorFallback } from '@/pages';
import { router } from '@/router';

/**
 * アプリケーションのルーティングとトースト提供を設定するコンポーネントです。
 * AuthProviderで認証状態を管理し、ErrorBoundaryでエラーをキャッチし、ToastProviderでトースト通知を提供します。
 * @returns アプリケーションのルーティングとトースト提供を設定したJSX
 */
export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ErrorBoundary FallbackComponent={AppErrorFallback}>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ToastProvider>
    </AuthProvider>
  );
}
