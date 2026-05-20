import { Typography, Button, Stack } from '@mui/material';
import type { FallbackProps } from 'react-error-boundary';

/**
 * アプリケーションのエラーをキャッチして表示するフォールバックコンポーネント。
 * react-error-boundary の FallbackProps を受け取り、エラー情報を表示します。
 * @param error キャッチされたエラーオブジェクト
 * @param resetErrorBoundary エラーバウンダリーをリセットする関数
 * @returns エラー表示用の JSX
 */
export function AppErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  console.log(error);

  return (
    <Stack
      spacing={3}
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4">エラーが発生しました</Typography>

      <Typography color="text.secondary">
        予期しないエラーが発生しました。
      </Typography>
      <Button variant="contained" onClick={resetErrorBoundary}>
        再試行
      </Button>
    </Stack>
  );
}
