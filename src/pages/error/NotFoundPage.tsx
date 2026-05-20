import { Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants';

/**
 * 404 ページ（Not Found ページ）を表示するコンポーネント。
 * @returns ルートページに戻るボタンを含む NotFound ページの JSX。
 */
export function NotFoundPage() {
  const navigate = useNavigate();

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
      <Typography variant="h3">404</Typography>
      <Typography variant="h6">ページが見つかりません</Typography>
      <Typography color="text.secondary">
        指定されたページは存在しないか、 削除された可能性があります。
      </Typography>
      <Button variant="contained" onClick={() => navigate(ROUTES.home())}>
        ホームに戻る
      </Button>
    </Stack>
  );
}
