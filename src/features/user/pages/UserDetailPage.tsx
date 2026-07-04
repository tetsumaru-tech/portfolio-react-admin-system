import { Typography, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import { ButtonSection, AppButton, BackButton } from '@/components';
import { ROUTES } from '@/constants';
import { useUserDetailQuery } from '@/features/user/api';
import {
  FormSection,
  FormRowContainer,
  FormRow,
} from '@/features/user/components';
import { getAge } from '@/types';

/**
 * ユーザー詳細ページのコンポーネント。
 * URL のパラメーターからユーザー ID を取得し、
 * 該当ユーザーの詳細情報を表示します。
 */
export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const navigate = useNavigate();

  // React Query
  const { data: user } = useUserDetailQuery(userId);

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          ユーザー詳細
        </Typography>
        <FormSection>
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
              navigate(ROUTES.userEdit(userId));
            }}
          >
            編集
          </AppButton>
          <AppButton onClick={() => navigate(ROUTES.userPassowrdEdit(userId!))}>
            パスワード変更
          </AppButton>
        </ButtonSection>
      </Paper>
    </>
  );
}
