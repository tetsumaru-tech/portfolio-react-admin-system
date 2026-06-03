import { Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { useAuth } from '@/features/auth/hooks';

/**
 * ログインページ
 */
export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  function handleLogin() {
    login({ id: 1, name: 'John Doe' });
    const from = location.state?.from?.pathname ?? ROUTES.users();
    navigate(from, { replace: true });
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
