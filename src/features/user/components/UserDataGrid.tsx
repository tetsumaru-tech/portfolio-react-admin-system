import type { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppDataGrid } from '@/components';
import { ROUTES } from '@/constants';
import {
  userColumns,
  createUserActionColumn,
} from '@/features/user/components';
import type { User } from '@/features/user/types';

type Props = {
  users: User[];
  total: number;
  loading?: boolean;
  paginationModel?: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  sortModel: GridSortModel;
  onSortModelChange: (model: GridSortModel) => void;
  onDeleteClick: (id: number) => void;
  isPending: boolean;
};

/**
 * ユーザーデータをグリッド形式で表示するコンポーネント
 * @param props.users - 表示するユーザーデータの配列
 * @param props.total - ユーザーデータの総数（ページネーションのため）
 * @param props.loading - データがロード中かどうかを示すフラグ
 * @param props.paginationModel - ページネーションのモデル
 * @param props.onPaginationModelChange - ページネーションモデルが変更されたときのコールバック関数
 * @param props.sortModel - ソートモデル
 * @param props.onSortModelChange - ソートモデルが変更されたときのコールバック関数
 * @param props.onDeleteClick - ユーザー削除ボタンがクリックされたときのコールバック関数
 * @param props.isPending - 削除操作が保留中かどうかを示すフラグ
 * @returns ユーザーデータグリッド
 */
export function UserDataGrid({
  users,
  total,
  loading,
  paginationModel,
  onPaginationModelChange,
  sortModel,
  onSortModelChange,
  onDeleteClick,
  isPending,
}: Props) {
  const navigate = useNavigate();

  //リファレンス安定化のため、useMemoを利用（deleteMutation object 自体がrender で変わる可能性あるため)
  const actionColumn = useMemo(
    () =>
      createUserActionColumn({
        onEdit: (id) => {
          navigate(ROUTES.userEdit(id));
        },
        onDelete: onDeleteClick,
        disabled: isPending,
      }),
    [navigate, onDeleteClick, isPending],
  );

  return (
    <AppDataGrid
      rows={users}
      columns={[...userColumns, actionColumn]}
      loading={loading}
      getRowId={(row) => Number(row.id)}
      onRowClick={(params) => {
        navigate(ROUTES.userDetail(params.row.id));
      }}
      rowCount={total}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      sortingMode="server"
      sortModel={sortModel}
      onSortModelChange={onSortModelChange}
    />
  );
}
