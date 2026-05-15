import { Button } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';

import type { User } from '@/features/user/types';

type Props = {
  onEdit(id: number): void;
  onDelete(id: number): void;
  disabled?: boolean;
};

export const createUserActionColumn = ({
  onEdit,
  onDelete,
  disabled,
}: Props): GridColDef<User> => ({
  field: 'actions',
  headerName: '操作',
  sortable: false,
  width: 180,
  renderCell: ({ row }) => (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ mr: 1 }}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(Number(row.id));
        }}
      >
        編集
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          if (!confirm('削除しますか？')) {
            return;
          }
          onDelete(Number(row.id));
        }}
      >
        削除
      </Button>
    </>
  ),
});
