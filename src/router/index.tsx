import { createBrowserRouter } from 'react-router-dom';

import { ROUTEPATTERNS } from '@/constants';
import { LoginPage } from '@/features/auth/pages';
import { ProtectedRoute, AdminRoute } from '@/features/auth/routes';
import {
  UserListPage,
  UserDetailPage,
  UserEditPage,
  UserConfirmPage,
  UserPasswordPage,
  UserProfilePage,
} from '@/features/user/pages';
import { MainLayout } from '@/layouts';
import { TopPage } from '@/pages';
import { NotFoundPage } from '@/pages';

export const router = createBrowserRouter([
  { path: ROUTEPATTERNS.LOGIN, element: <LoginPage /> },
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
            element: <UserProfilePage />,
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
                path: ROUTEPATTERNS.USER_PASSWORD_EDIT,
                element: <UserPasswordPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
