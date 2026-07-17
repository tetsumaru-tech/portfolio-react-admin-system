import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

/**
 * ボタンを中央揃えで配置するセクションコンポーネント
 * @param children ボタンなどの子要素
 */
export function ButtonSection({ children }: Props) {
  return (
    <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
      {children}
    </Box>
  );
}
