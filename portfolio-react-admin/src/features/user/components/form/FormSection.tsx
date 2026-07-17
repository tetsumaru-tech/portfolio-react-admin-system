import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

/**
 * フォームセクションを表すコンポーネント
 * @param props - コンポーネントのプロパティ
 */
export function FormSection({ children }: Props) {
  return (
    <Box border={1} borderColor="divider" sx={{ width: '100%' }}>
      {children}
    </Box>
  );
}
