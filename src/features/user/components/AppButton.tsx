import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';

type Props = ButtonProps;

export function AppButton(props: Props) {
  return <Button variant="contained" sx={{ minWidth: 120 }} {...props} />;
}
