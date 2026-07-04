import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';

type Props = ButtonProps;

/**
 * アプリケーションで使用する汎用ボタンコンポーネント
 * @param props MUI Button のプロパティ
 */
export function AppButton(props: Props) {
  return <Button variant="contained" sx={{ minWidth: 120 }} {...props} />;
}
