import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = ButtonProps;

export function BackButton(props: Props) {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      sx={{ minWidth: 120 }}
      onClick={props.onClick ?? (() => navigate(-1))}
    >
      {props.children ?? '戻る'}
    </Button>
  );
}
