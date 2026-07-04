import { Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ButtonSection, AppButton } from '@/components';
import { ROUTES } from '@/constants';
import { AdminOnly } from '@/features/auth/components';

/**
 * トップページコンポーネント
 */
export function TopPage() {
  const navigate = useNavigate();
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          トップページ
        </Typography>
        <Typography variant="h6" gutterBottom>
          ユーザーメニュー
        </Typography>
        <ButtonSection>
          <AppButton
            color="primary"
            onClick={() => {
              navigate(ROUTES.profile());
            }}
          >
            プロファイル
          </AppButton>
        </ButtonSection>
        <AdminOnly>
          <Typography variant="h6" gutterBottom>
            管理者メニュー
          </Typography>
          <ButtonSection>
            <AppButton
              color="primary"
              onClick={() => {
                navigate(ROUTES.users());
              }}
            >
              ユーザー一覧
            </AppButton>
            <AppButton
              color="primary"
              onClick={() => {
                navigate(ROUTES.userCreate());
              }}
            >
              ユーザー登録
            </AppButton>
          </ButtonSection>
        </AdminOnly>
      </Paper>
    </>
  );
}
