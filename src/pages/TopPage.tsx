import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Block as BlockIcon,
  Group as GroupIcon,
  Key as KeyIcon,
  Lock as LockIcon,
  Logout as LogoutIcon,
  NotificationsActive as NotificationsActiveIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
  TableRows as TableRowsIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { Typography, Paper, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { MenuCard } from '@/components';
import { ROUTES } from '@/constants';
import { AdminOnly } from '@/features/auth/components';
import { useAuth } from '@/features/auth/hooks';

/**
 * トップページコンポーネント
 */
export function TopPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <LockIcon color="primary" />,
      label: 'Sanctum認証',
    },
    {
      icon: <AdminPanelSettingsIcon color="primary" />,
      label: '権限制御（Admin / User）',
    },
    {
      icon: <GroupIcon color="primary" />,
      label: 'ユーザーCRUD',
    },
    {
      icon: <PersonIcon color="primary" />,
      label: 'プロフィール管理',
    },
    {
      icon: <KeyIcon color="primary" />,
      label: 'パスワード変更',
    },
    {
      icon: <SearchIcon color="primary" />,
      label: 'リアルタイム検索',
    },
    {
      icon: <TableRowsIcon color="primary" />,
      label: 'サーバーサイドページング・ソート',
    },
    {
      icon: <VerifiedIcon color="primary" />,
      label: 'Zodバリデーション',
    },
    {
      icon: <NotificationsActiveIcon color="primary" />,
      label: 'Toast通知',
    },
    {
      icon: <LogoutIcon color="primary" />,
      label: '401自動ログアウト',
    },
    {
      icon: <BlockIcon color="primary" />,
      label: '403 Forbidden対応',
    },
  ];

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          ようこそ、{user?.fullName}さん
        </Typography>
        <Chip
          label={user?.role === 'admin' ? '管理者' : '一般ユーザー'}
          color={user?.role === 'admin' ? 'error' : 'primary'}
        />
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            ユーザーメニュー
          </Typography>
          <MenuCard
            title="プロフィール"
            description="プロフィール情報の確認・編集ができます。"
            icon={<PersonIcon color="primary" fontSize="large" />}
            onClick={() => {
              navigate(ROUTES.profile());
            }}
          />
          <MenuCard
            title="パスワード変更"
            description="パスワードの変更ができます。"
            icon={<KeyIcon color="primary" fontSize="large" />}
            onClick={() => {
              navigate(ROUTES.profilePassword());
            }}
          />
        </Paper>
        <AdminOnly>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              管理者メニュー
            </Typography>
            <MenuCard
              title="ユーザー管理"
              description="ユーザー情報の確認・編集ができます。"
              icon={<PersonIcon color="primary" fontSize="large" />}
              onClick={() => {
                navigate(ROUTES.users());
              }}
            />
            <MenuCard
              title="ユーザー登録"
              description="新しいユーザーを登録できます。"
              icon={<PersonAddIcon color="primary" fontSize="large" />}
              onClick={() => {
                navigate(ROUTES.userCreate());
              }}
            />
          </Paper>
        </AdminOnly>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            このポートフォリオについて
          </Typography>
          <Stack spacing={1}>
            {features.map((feature, index) => (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key={index}
              >
                {feature.icon}
                <Typography>{feature.label}</Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Paper>
    </>
  );
}
