import { createBrowserRouter } from 'react-router-dom';

import { ROUTEPATTERNS } from '@/constants';
import { LoginPage } from '@/features/auth/pages';
import { ProtectedRoute, AdminRoute } from '@/features/auth/routes';
import {
  ProfilePage,
  ProfileEditPage,
  ProfileConfirmPage,
} from '@/features/profile';
import {
  UserListPage,
  UserDetailPage,
  UserEditPage,
  UserConfirmPage,
  UserPasswordPage,
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
