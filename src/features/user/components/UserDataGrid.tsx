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
  loading?: boolean;
};

/**
 * ユーザーデータをグリッド形式で表示するコンポーネント
 * @param props - コンポーネントのプロップス
 * @param props.users - 表示するユーザーの配列
 * @param [props.loading] - ローディング状態（オプション）
 * @returns ユーザーデータグリッド
 */
export function UserDataGrid({ users, loading }: Props) {
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
    />
  );
}
