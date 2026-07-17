import { Box, CircularProgress } from '@mui/material';

/**
 * ローディング中の表示を行うコンポーネント。
 * 中央にサーキュラープログレスを配置します。
 *
 * @returns ローディングインジケーターを含む JSX 要素
 */
export function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={200}
    >
      <CircularProgress />
    </Box>
  );
}
