import type { GridColDef } from '@mui/x-data-grid';

import type { User } from '@/features/user/types';

export const userColumns: GridColDef<User>[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'fullName',
    headerName: '氏名',
    flex: 1,
    valueGetter: (_, row: User) => `${row.lastName} ${row.firstName}`,
  },
  { field: 'email', headerName: 'メール', flex: 1 },
  { field: 'birthday', headerName: '誕生日', width: 140 },
];
