import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export function FormSection({ children }: Props) {
  return (
    <Box border={1} borderColor="divider">
      {children}
    </Box>
  );
}
