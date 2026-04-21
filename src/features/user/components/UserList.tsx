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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@/components';
import { USER_FORM_STORAGE_KEY } from '@/features/user';
import { userApi } from '@/features/user/api';
import type { User } from '@/features/user/types';

type UserListProps = {
  users: User[];
};

export function UserList({ users }: UserListProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    // 検索実行
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      showToast('ユーザーを削除しました。');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate(`/users`);
    },
    onError: () => {
      showToast('ユーザーの削除に失敗しました。', 'error');
    },
  });

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
                      sessionStorage.removeItem(USER_FORM_STORAGE_KEY);
                      navigate(`/users/${user.id}/edit`);
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    編集
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!confirm('削除しますか？')) return;
                      deleteMutation.mutate(Number(user.id));
                    }}
                    disabled={deleteMutation.isPending}
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
