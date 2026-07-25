import { createBrowserRouter } from 'react-router-dom';

import { ROUTEPATTERNS, ROUTES } from '@/constants';
import { LoginPage } from '@/features/auth/pages';
import { AdminRoute, ProtectedRoute } from '@/features/auth/routes';
import {
  ProfileConfirmPage,
  ProfileEditPage,
  ProfilePage,
  ProfilePasswordPage,
} from '@/features/profile';
import { TopPage } from '@/features/top/pages';
import {
  UserConfirmPage,
  UserDetailPage,
  UserEditPage,
  UserListPage,
  UserPasswordPage,
} from '@/features/user/pages';
import { MainLayout } from '@/layouts';
import { setForbiddenHandler } from '@/lib';
import { ForbiddenPage, NotFoundPage } from '@/pages';

export const router = createBrowserRouter([
  { path: ROUTEPATTERNS.LOGIN, element: <LoginPage /> },
  { path: ROUTEPATTERNS.FORBIDDEN, element: <ForbiddenPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            path: ROUTEPATTERNS.TOP,
            element: <TopPage />,
          },
          {
            path: ROUTEPATTERNS.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: ROUTEPATTERNS.PROFILE_EDIT,
            element: <ProfileEditPage />,
          },
          {
            path: ROUTEPATTERNS.PROFILE_CONFIRM,
            element: <ProfileConfirmPage />,
          },
          {
            path: ROUTEPATTERNS.PROFILE_PASSWORD,
            element: <ProfilePasswordPage />,
          },
          {
            element: <AdminRoute />,
            children: [
              { path: ROUTEPATTERNS.USER_DETAIL, element: <UserDetailPage /> },
              { path: ROUTEPATTERNS.USER_CREATE, element: <UserEditPage /> },
              { path: ROUTEPATTERNS.USER_EDIT, element: <UserEditPage /> },
              {
                path: ROUTEPATTERNS.USER_CONFIRM,
                element: <UserConfirmPage />,
              },

              { path: ROUTEPATTERNS.USERS, element: <UserListPage /> },
              {
                path: ROUTEPATTERNS.USER_PASSWORD,
                element: <UserPasswordPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

/**
 * API層から通知された403 Forbiddenを画面遷移へ変換する。
 */
setForbiddenHandler(() => router.navigate(ROUTES.forbidden()));
