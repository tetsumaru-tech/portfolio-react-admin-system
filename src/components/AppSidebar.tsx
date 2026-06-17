import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { ROUTEPATTERNS, DRAWER_WIDTH } from '@/constants';
import { AdminOnly } from '@/features/auth/components';

/**
 * アプリケーションのサイドバー コンポーネント
 * @returns アプリケーションのサイドバーを表示する JSX
 */
export function AppSidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton component={Link} to={ROUTEPATTERNS.PROFILE}>
          <ListItemText primary="プロファイル" />
        </ListItemButton>
        <AdminOnly>
          <ListItemButton component={Link} to={ROUTEPATTERNS.USERS}>
            <ListItemText primary="ユーザー一覧" />
          </ListItemButton>
          <ListItemButton component={Link} to={ROUTEPATTERNS.USER_CREATE}>
            <ListItemText primary="ユーザー登録" />
          </ListItemButton>
        </AdminOnly>
      </List>
    </Drawer>
  );
}
