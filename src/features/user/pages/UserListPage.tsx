import { Pagination, Box } from '@mui/material';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUsersQuery } from '@/features/user/api';
import { UserList, SearchForm, AppButton } from '@/features/user/components';
import type { UserSearchCondition } from '@/features/user/types';

/**
 * ユーザーリストページコンポーネント
 */
export function UserListPage() {
  const navigate = useNavigate();

  // 入力用
  const [condition, setCondition] = useState<UserSearchCondition>({});
  // 検索実行用
  const [searchCondition, setSearchCondition] = useState<UserSearchCondition>(
    {},
  ); // 検索実行時の条件を保持

  // React Query
  const { data, isLoading, isError } = useUsersQuery(searchCondition);

  const [page, setPage] = useState<number>(1);
  const perPage = 4; // 1ページ毎の件数

  // ページング計算
  const paginatedUsers = useMemo(() => {
    const users = data?.data ?? [];
    const startIndex = (page - 1) * perPage;
    return users.slice(startIndex, startIndex + perPage);
  }, [data, page]);

  const lastPage = Math.ceil((data?.data.length ?? 0) / perPage);

  /**
   * 検索を実行する
   */
  function handleSearch(): void {
    setSearchCondition(condition);
    setPage(1);
  }

  /**
   * ページングを処理する
   * @param page ページ番号
   */
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
