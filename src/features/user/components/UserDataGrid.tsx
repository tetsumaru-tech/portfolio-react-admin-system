import type { GridPaginationModel } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppDataGrid } from '@/components';
import { ROUTES } from '@/constants';
import { useDeleteUserMutation } from '@/features/user/api';
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
};

/**
 * ユーザーデータをグリッド形式で表示するコンポーネント
 * @param props.users - 表示するユーザーデータの配列
 * @param props.total - ユーザーデータの総数（ページネーションのため）
 * @param props.loading - データがロード中かどうかを示すフラグ
 * @param props.paginationModel - ページネーションのモデル
 * @param props.onPaginationModelChange - ページネーションモデルが変更されたときのコールバック関数
 * @returns ユーザーデータグリッド
 */
export function UserDataGrid({
  users,
  total,
  loading,
  paginationModel,
  onPaginationModelChange,
}: Props) {
  const navigate = useNavigate();

  const { mutate, isPending } = useDeleteUserMutation();

  //リファレンス安定化のため、useMemoを利用（deleteMutation object 自体がrender で変わる可能性あるため)
  const actionColumn = useMemo(
    () =>
      createUserActionColumn({
        onEdit: (id) => {
          navigate(ROUTES.userEdit(id));
        },

        onDelete: mutate,

        disabled: isPending,
      }),
    [navigate, mutate, isPending],
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
    />
  );
}
