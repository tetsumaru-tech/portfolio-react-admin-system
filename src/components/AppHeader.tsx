import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { DRAWER_WIDTH } from '@/constants';

/**
 * アプリケーションのヘッダーコンポーネント
 * @returns アプリケーションのヘッダーを表示する JSX
 */
export function AppHeader() {
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
        <Button color="inherit">Users</Button>
      </Toolbar>
    </AppBar>
  );
}
