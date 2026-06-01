import { Outlet } from 'react-router-dom';

import { AppHeader, AppContainer } from '@/components';

/**
 * アプリケーションのメインレイアウトコンポーネント
 * ヘッダーとコンテナを含み、Outletを使用して子ルートのコンポーネントを表示します。
 * @returns メインレイアウトの JSX
 */
export function MainLayout() {
  return (
    <>
      <AppHeader />
      <AppContainer sx={{ mt: 8 }}>
        <Outlet />
      </AppContainer>
    </>
  );
}
