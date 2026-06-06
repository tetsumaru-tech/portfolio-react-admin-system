import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { DRAWER_WIDTH } from '@/constants';
import { ROUTES } from '@/constants';
import { authApi } from '@/features/auth/api';
import { useAuth } from '@/features/auth/hooks';

/**
 * アプリケーションのヘッダーコンポーネント
 * @returns アプリケーションのヘッダーを表示する JSX
 */
export function AppHeader() {
  const navigate = useNavigate();

  const { setUser, user } = useAuth();

  const handleLogout = async () => {
    await authApi.logout();
    setUser(null);
    navigate(ROUTES.login());
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          React Admin Portfolio
        </Typography>
        {user && (
          <>
            <Typography>Welcome, {user.fullName} | </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
