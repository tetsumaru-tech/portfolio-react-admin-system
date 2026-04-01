import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserListPage from '@/pages/UserListPage';
import UserDetailPage from '@/pages/UserDetailPage';
import UserDetailEdit from '@/pages/UserDetailEdit';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="/users/:id/edit" element={<UserDetailEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
