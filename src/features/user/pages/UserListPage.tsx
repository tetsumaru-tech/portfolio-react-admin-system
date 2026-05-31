import { CircularProgress } from '@mui/material';
import type { GridSortModel } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ErrorMessage } from '@/components';
import { ROUTES } from '@/constants';
import { useUsersQuery } from '@/features/user/api';
import { UserDataGrid } from '@/features/user/components';
import { SearchForm, AppButton } from '@/features/user/components';
import type { UserSearchCondition } from '@/features/user/types';
import { useDebounce } from '@/hooks';
import { updateSearchParams } from '@/utils';
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

  // リアルタイム検索の状態を管理
  const [isRealTimeSearch, setIsRealTimeSearch] = useState<boolean>(false);

  // 入力のデバウンスされた値
  const debouncedCondition = useDebounce(condition, 1000);

  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationModel, setPaginationModel] = useState({
    page: Number(searchParams.get('page') ?? 0),
    pageSize: Number(searchParams.get('pageSize') ?? 10),
  });

  const initialSortField = searchParams.get('sortBy');
  const initialSortOrder = searchParams.get('sortOrder');

  const [sortModel, setSortModel] = useState<GridSortModel>(
    initialSortField && initialSortOrder
      ? [{ field: initialSortField, sort: initialSortOrder as 'asc' | 'desc' }]
      : [],
  );

  // React Query
  const { data, isLoading, isError, isFetching } = useUsersQuery(
    isRealTimeSearch ? debouncedCondition : searchCondition,
    paginationModel.page,
    paginationModel.pageSize,
    sortModel,
  );

  useEffect(() => {
    updateSearchParams(setSearchParams, {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
    });
  }, [paginationModel, setSearchParams]);

  useEffect(() => {
    const sort = sortModel[0];
    updateSearchParams(setSearchParams, {
      sortBy: sort?.field,
      sortOrder: sort?.sort,
    });
  }, [sortModel, setSearchParams]);

  /**
   * 検索を実行する
   */
  function handleSearch(): void {
    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
    setSearchCondition(condition);
  }

  function onToggleRealTimeSearch(enabled: boolean) {
    setIsRealTimeSearch(enabled);
    if (!enabled) {
      // リアルタイム検索をオフにしたときは、現在の入力値で検索を実行
      setSearchCondition(condition);
    }
  }

  if (isError) return <ErrorMessage message="ユーザーの取得に失敗しました。" />;

  return (
    <>
      <h1>User List</h1>
      <h2>検索条件</h2>
      <SearchForm
        condition={condition}
        onChange={setCondition}
        onSearch={handleSearch}
        isRealTimeSearch={isRealTimeSearch}
        onToggleRealTimeSearch={onToggleRealTimeSearch}
      />
      <hr />
      <h2>検索結果</h2>
      {isRealTimeSearch && isFetching && <CircularProgress size={20} />}
      <AppButton
        variant="contained"
        color="primary"
        onClick={() => {
          navigate(ROUTES.userCreate());
        }}
        sx={{ mb: 2 }}
      >
        新規作成
      </AppButton>
      <UserDataGrid
        users={data?.data ?? []}
        total={data?.total ?? 0}
        loading={isLoading || isFetching}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
      />
    </>
  );
}
