import { useParams, useLocation } from 'react-router-dom';
import { Typography, Paper } from '@mui/material';
import { getAge } from '@/types';
import { useNavigate } from 'react-router-dom';

import type { UserFormData } from '@/features/user/types';
import {
  FormSection,
  FormRowContainer,
  FormRow,
  ButtonSection,
  AppButton,
  BackButton,
} from '@/features/user/components';

export function UserDetailConfirmPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const location = useLocation();
  const formData = location.state.formData as UserFormData;

  const navigate = useNavigate();

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          ユーザー確認
        </Typography>
        <FormSection>
          {[
            {
              label: '名前',
              value: `${formData.lastName} ${formData.firstName}`,
            },
            { label: 'メール', value: formData.email },
            { label: '誕生日', value: formData.birthday },
            { label: '年齢', value: getAge(formData.birthday) },
          ].map((row, i, rows) => (
            <FormRowContainer key={row.label}>
              <FormRow label={row.label} isLast={i === rows.length - 1}>
                <Typography>{row.value}</Typography>
              </FormRow>
            </FormRowContainer>
          ))}
        </FormSection>
        <ButtonSection>
          <BackButton
            onClick={() => {
              navigate(`/users/${userId}/edit`, {
                state: { formData: formData },
              });
            }}
          />
          <AppButton color="primary" onClick={() => {}} type="submit">
            登録
          </AppButton>
        </ButtonSection>
      </Paper>
    </>
  );
}
