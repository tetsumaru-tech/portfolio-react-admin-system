import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { AppHeader, AppContainer, AppSidebar } from '@/components';

/**
 * アプリケーションのメインレイアウトコンポーネント
 * ヘッダーとコンテナを含み、Outletを使用して子ルートのコンポーネントを表示します。
 * @returns メインレイアウトの JSX
 */
export function MainLayout() {
  return (
    <>
      <AppHeader />
      <Box display="flex">
        <AppSidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <AppContainer>
            <Outlet />
          </AppContainer>
        </Box>
      </Box>
    </>
  );
}
