import { Box, CircularProgress, Typography, Divider } from '@mui/material';
import type { GridSortModel } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ErrorMessage } from '@/components';
import { AppButton } from '@/components';
import { ConfirmDialog } from '@/components';
import { ROUTES } from '@/constants';
import { useUsersQuery, useDeleteUserMutation } from '@/features/user/api';
import { UserDataGrid } from '@/features/user/components';
import { SearchForm } from '@/features/user/components';
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

  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const deleteMutation = useDeleteUserMutation();

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
      <Typography variant="h4" gutterBottom>
        ユーザー一覧
      </Typography>
      <Typography variant="h5" gutterBottom>
        検索条件
      </Typography>
      <SearchForm
        condition={condition}
        onChange={setCondition}
        onSearch={handleSearch}
        isRealTimeSearch={isRealTimeSearch}
        onToggleRealTimeSearch={onToggleRealTimeSearch}
      />
      <Divider sx={{ my: 3 }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h5">検索結果</Typography>
          {isRealTimeSearch && isFetching && <CircularProgress size={20} />}
        </Box>
        <AppButton
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(ROUTES.userCreate());
          }}
        >
          新規作成
        </AppButton>
      </Box>
      <UserDataGrid
        users={data?.data ?? []}
        total={data?.total ?? 0}
        loading={isLoading || isFetching}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        onDeleteClick={setDeleteTargetId}
        isPending={deleteMutation.isPending}
      />
      <ConfirmDialog
        open={deleteTargetId !== null}
        title="ユーザー削除"
        message="このユーザーを削除しますか？
         この操作は元に戻せません。"
        confirmLabel="削除"
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId == null) return;
          deleteMutation.mutateAsync(deleteTargetId);
          setDeleteTargetId(null);
        }}
      />
    </>
  );
}
