import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { DRAWER_WIDTH } from '@/constants';
import { useAuth } from '@/features/auth/hooks';

/**
 * アプリケーションのヘッダーコンポーネント
 * @returns アプリケーションのヘッダーを表示する JSX
 */
export function AppHeader() {
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    logout();
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
