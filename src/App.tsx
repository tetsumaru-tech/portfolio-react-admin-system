import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  UserListPage,
  UserDetailPage,
  UserDetailEditPage,
  UserDetailConfirmPage,
} from '@/features/user/pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="/users/:id/edit" element={<UserDetailEditPage />} />
        <Route path="/users/:id/confirm" element={<UserDetailConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
}
