import { Pagination, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { USER_FORM_STORAGE_KEY } from '@/features/user';
import { userApi } from '@/features/user/api';
import { UserList, SearchForm, AppButton } from '@/features/user/components';
import type { UserSearchCondition } from '@/features/user/types';

export function UserListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 入力用
  const [condition, setCondition] = useState<UserSearchCondition>({});
  // 検索実行用
  const [searchCondition, setSearchCondition] = useState<UserSearchCondition>(
    {},
  ); // 検索実行時の条件を保持

  // React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', searchCondition],
    queryFn: () => userApi.getList(searchCondition),
  });

  const [page, setPage] = useState<number>(1);
  const perPage = 4; // 1ページ毎の件数

  // ページング計算
  const paginatedUsers = useMemo(() => {
    const users = data?.data ?? [];
    const startIndex = (page - 1) * perPage;
    return users.slice(startIndex, startIndex + perPage);
  }, [data, page]);

  const lastPage = Math.ceil((data?.data.length ?? 0) / perPage);

  function handleSearch(): void {
    setSearchCondition(condition);
    setPage(1);
  }

  function handlePaging(page: number): void {
    setPage(page);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <>
      <h1>User List</h1>
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
      <UserList users={paginatedUsers} />
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
