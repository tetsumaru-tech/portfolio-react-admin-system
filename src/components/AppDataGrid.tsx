import {
  DataGrid,
  type DataGridProps,
  type GridValidRowModel,
} from '@mui/x-data-grid';

/**
 * アプリケーション用のデータグリッドコンポーネント
 * @param props - コンポーネントのプロップス
 * @returns アプリケーション用のデータグリッド
 */
export function AppDataGrid<R extends GridValidRowModel>(
  props: DataGridProps<R>,
) {
  return (
    <DataGrid
      autoHeight
      disableRowSelectionOnClick
      pageSizeOptions={[10, 20, 50]}
      {...props}
    />
  );
}
