import { useParams } from 'react-router-dom';
import { users } from '@/features/user/types';
import { Grid, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAge } from '@/types';
import {
  FormSection,
  FormRowContainer,
  FormRow,
  ButtonSection,
  AppButton,
  BackButton,
} from '@/features/user/components';

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return <div>ユーザーが見つかりません。</div>;
  }

  const navigate = useNavigate();
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          ユーザー詳細
        </Typography>
        <FormSection>
          {[
            { label: '名前', value: `${user.lastName} ${user.firstName}` },
            { label: 'メール', value: user.email },
            { label: '誕生日', value: user.birthday },
            { label: '年齢', value: getAge(user.birthday) },
            {
              label: '登録日',
              value:
                user.createdAt.toLocaleDateString() +
                ' ' +
                user.createdAt.toLocaleTimeString(),
            },
          ].map((row, i, rows) => (
            <FormRowContainer key={row.label}>
              <FormRow label={row.label} isLast={i === rows.length - 1}>
                <Typography>{row.value}</Typography>
              </FormRow>
            </FormRowContainer>
          ))}
        </FormSection>
        <ButtonSection>
          <BackButton />
          <AppButton
            color="primary"
            onClick={() => {
              navigate(`/users/${user.id}/edit`);
            }}
          >
            編集
          </AppButton>
        </ButtonSection>
      </Paper>
    </>
  );
}
