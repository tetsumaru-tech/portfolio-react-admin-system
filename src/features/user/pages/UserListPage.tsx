import { Pagination, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorMessage } from '@/components';
import { USER_FORM_STORAGE_KEY } from '@/features/user';
import { userApi } from '@/features/user/api';
import { UserList, SearchForm, AppButton } from '@/features/user/components';
import type { UserSearchCondition, User } from '@/features/user/types';
import { isMatch } from '@/utils';

export function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await userApi.getList();
      setUsers(data);
    };
    fetch();
  }, []);

  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const [condition, setCondition] = useState<UserSearchCondition>({});
  const [page, setPage] = useState<number>(1);
  const perPage = 4; // 1ページ毎の件数
  const startIndex = (page - 1) * perPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + perPage);
  const lastPage = Math.ceil(filteredUsers.length / perPage);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSearch(): void {
    setFilteredUsers(
      users.filter((user) => {
        const fullName = (user.lastName + user.firstName).trim();
        if (!isMatch(fullName, condition.name ?? '')) {
          return false;
        }
        if (!isMatch(user.email, condition.email ?? '')) {
          return false;
        }
        return true;
      }),
    );
    setPage(1);
  }

  function handlePaging(page: number): void {
    setPage(page);
  }

  const navigate = useNavigate();

  return (
    <>
      <h1>User List</h1>
      <ErrorMessage message={error} />
      <h2>検索条件</h2>
      <SearchForm
        condition={condition}
        onChange={setCondition}
        onSearch={handleSearch}
      />
      <hr />
      <h2>検索結果</h2>
      <AppButton
        variant="contained"
        color="primary"
        onClick={() => {
          sessionStorage.removeItem(USER_FORM_STORAGE_KEY);
          navigate('/users/new');
        }}
        sx={{ mb: 2 }}
      >
        新規作成
      </AppButton>
      <UserList
        users={paginatedUsers}
        loading={loading}
        setLoading={setLoading}
        setError={setError}
      />
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={lastPage}
          page={page}
          onChange={(_, value) => handlePaging(value)}
        />
      </Box>
    </>
  );
}
