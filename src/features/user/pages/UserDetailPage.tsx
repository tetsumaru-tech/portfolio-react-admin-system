import { Typography, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { USER_FORM_STORAGE_KEY } from '@/features/user';
import { userApi } from '@/features/user/api';
import {
  FormSection,
  FormRowContainer,
  FormRow,
  ButtonSection,
  AppButton,
  BackButton,
} from '@/features/user/components';
import { getAge } from '@/types';

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const navigate = useNavigate();

  // React Query
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUser(userId),
  });

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
              sessionStorage.removeItem(USER_FORM_STORAGE_KEY);
              navigate(`/users/${userId}/edit`);
            }}
          >
            編集
          </AppButton>
        </ButtonSection>
      </Paper>
    </>
  );
}
