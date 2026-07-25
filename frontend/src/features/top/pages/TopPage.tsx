import {
  Key as KeyIcon,
  PersonAdd as PersonAddIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Chip, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { MenuCard } from '@/components';
import { ROUTES } from '@/constants';
import { AdminOnly } from '@/features/auth/components';
import { useAuth } from '@/features/auth/hooks';
import { FeatureList, SkillList } from '@/features/top/components';

/**
 * トップページコンポーネント
 */
export function TopPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

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
          <Typography variant="h4" gutterBottom>
            このポートフォリオについて
          </Typography>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
              Features
            </Typography>
            <FeatureList />
          </Paper>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Skills
            </Typography>
            <SkillList />
          </Paper>
        </Paper>
      </Paper>
    </>
  );
}
