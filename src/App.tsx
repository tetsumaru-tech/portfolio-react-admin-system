import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastProvider } from './components';

import {
  UserListPage,
  UserDetailPage,
  UserEditPage,
  UserConfirmPage,
} from '@/features/user/pages';
console.log(import.meta.env);

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/users/new" element={<UserEditPage />} />
          <Route path="/users/:id/edit" element={<UserEditPage />} />
          <Route path="/users/:id/confirm" element={<UserConfirmPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
