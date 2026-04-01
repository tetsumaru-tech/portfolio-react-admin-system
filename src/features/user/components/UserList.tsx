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

type UserListProps = {
  users: User[];
};

export function UserList({ users }: UserListProps) {
  const navigate = useNavigate();
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
                    }}
                  >
                    編集
                  </Button>
                  <Button variant="outlined" color="error" size="small">
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
