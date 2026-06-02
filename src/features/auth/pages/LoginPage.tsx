import { Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { useAuth } from '@/features/auth/hooks';

/**
 * ログインページ
 */
export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleLogin() {
    login({ id: 1, name: 'John Doe' });
    navigate(ROUTES.users());
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 400, margin: '0 auto', mt: 8 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Login</Typography>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
      >
        ログイン
      </Button>
    </Paper>
  );
}
