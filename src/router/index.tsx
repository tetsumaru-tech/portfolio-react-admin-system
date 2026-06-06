import { createBrowserRouter } from 'react-router-dom';

import { ROUTEPATTERNS } from '@/constants';
import { ProtectedRoute } from '@/features/auth/components';
import { LoginPage } from '@/features/auth/pages';
import {
  UserListPage,
  UserDetailPage,
  UserEditPage,
  UserConfirmPage,
} from '@/features/user/pages';
import { MainLayout } from '@/layouts';
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
            path: ROUTEPATTERNS.HOME,
            element: <UserListPage />,
          },
          { path: ROUTEPATTERNS.USERS, element: <UserListPage /> },
          { path: ROUTEPATTERNS.USER_DETAIL, element: <UserDetailPage /> },
          { path: ROUTEPATTERNS.USER_CREATE, element: <UserEditPage /> },
          { path: ROUTEPATTERNS.USER_EDIT, element: <UserEditPage /> },
          { path: ROUTEPATTERNS.USER_CONFIRM, element: <UserConfirmPage /> },
        ],
      },
    ],
  },
]);
