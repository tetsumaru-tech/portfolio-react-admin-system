import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUsersQuery } from '@/features/user/api';
import { UserDataGrid } from '@/features/user/components';
import { SearchForm, AppButton } from '@/features/user/components';
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

  /**
   * 検索を実行する
   */
  function handleSearch(): void {
    setSearchCondition(condition);
  }

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
      <UserDataGrid users={data?.data ?? []} loading={isLoading} />
    </>
  );
}
