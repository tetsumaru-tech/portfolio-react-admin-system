import {
  DataGrid,
  type DataGridProps,
  type GridValidRowModel,
} from '@mui/x-data-grid';

import { Empty, Loading } from '@/components/feedback';

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
      slots={{
        loadingOverlay: LoadingOverlay,
        noRowsOverlay: EmptyOverlay,
      }}
      {...props}
    />
  );
}

/**
 * DataGrid用ローディング表示
 */
function LoadingOverlay() {
  return <Loading />;
}

/**
 * DataGrid用データなし表示
 */
function EmptyOverlay() {
  return <Empty message="データがありません。" />;
}
