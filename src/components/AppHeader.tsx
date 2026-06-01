import { AppBar, Toolbar, Typography } from '@mui/material';

/**
 * アプリケーションのヘッダーコンポーネント
 * @returns アプリケーションのヘッダーを表示する JSX
 */
export function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          React Admin Portfolio
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
