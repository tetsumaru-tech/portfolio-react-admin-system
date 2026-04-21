import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastProvider } from './components';

import {
  UserListPage,
  UserDetailPage,
  UserDetailEditPage,
  UserDetailConfirmPage,
} from '@/features/user/pages';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/users/new" element={<UserDetailEditPage />} />
          <Route path="/users/:id/edit" element={<UserDetailEditPage />} />
          <Route
            path="/users/:id/confirm"
            element={<UserDetailConfirmPage />}
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
