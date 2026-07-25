import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = ButtonProps;

/**
 * 前のページに戻るボタンコンポーネント
 * @param props MUI Button のプロパティ
 */
export function BackButton(props: Props) {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      sx={{ minWidth: 120 }}
      onClick={() => {
        navigate(-1);
      }}
      {...props}
    >
      {props.children ?? '戻る'}
    </Button>
  );
}
