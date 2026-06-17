import { Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { useAuth } from '@/features/auth/hooks';
import { useUserDetailQuery } from '@/features/user/api';
import {
  FormSection,
  FormRowContainer,
  FormRow,
  ButtonSection,
  AppButton,
  BackButton,
} from '@/features/user/components';
import { getAge } from '@/types';

/**
 *
 */
export function UserProfilePage() {
  // const { id } = useParams<{ id: string }>();
  // const userId = Number(id);

  const navigate = useNavigate();

  const { user } = useAuth();
  // // React Query
  // const { data: user } = useUserDetailQuery(userId);
  if (!user) {
    navigate(ROUTES.top());
    return null;
  }

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          プロファイル
        </Typography>
        {/* <FormSection>
          {user
            ? [
                { label: '名前', value: `${user.lastName} ${user.firstName}` },
                { label: 'メール', value: user.email },
                { label: '誕生日', value: user.birthday },
                { label: '年齢', value: getAge(user.birthday) },
              ].map((row, i, rows) => (
                <FormRowContainer key={row.label}>
                  <FormRow label={row.label} isLast={i === rows.length - 1}>
                    <Typography>{row.value}</Typography>
                  </FormRow>
                </FormRowContainer>
              ))
            : ''}
        </FormSection>
        <ButtonSection>
          <BackButton />
          <AppButton
            color="primary"
            onClick={() => {
              navigate(ROUTES.userEdit(user.id));
            }}
          >
            編集
          </AppButton>
          <AppButton onClick={() => navigate(ROUTES.userPassowrdEdit(user.id))}>
            パスワード変更
          </AppButton>
        </ButtonSection> */}
      </Paper>
    </>
  );
}
