import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export function ButtonSection({ children }: Props) {
  return (
    <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
      {children}
    </Box>
  );
}
