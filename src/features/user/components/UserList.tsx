import type { User } from '@/features/user/types';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api';

type UserListProps = {
  users: User[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export function UserList({
  users,
  loading,
  setLoading,
  setError,
}: UserListProps) {
  const navigate = useNavigate();
  const handleDelete = async (userId: Number) => {
    if (loading) return; // 多重クリック防止
    try {
      setError(null);
      setLoading(true);
      if (confirm('削除しますか？')) {
        await userApi.delete(userId);
        navigate(0); // 画面をリロードして最新のユーザーリストを表示
      }
    } catch (e) {
      setError('ユーザー情報の削除に失敗しました。');
    } finally {
      setLoading(false);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>氏名</TableCell>
            <TableCell>メール</TableCell>
            <TableCell>誕生日</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow
                hover
                key={user.id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
                onClick={() => navigate(`/users/${user.id}`)}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.lastName} {user.firstName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.birthday}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/users/${user.id}/edit`);
                    }}
                    disabled={loading}
                  >
                    編集
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(Number(user.id));
                    }}
                    disabled={loading}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
