import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper } from '@mui/material';
import { getAge } from '@/types';
import { UserApi } from '@/features/user';
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await UserApi.create(formData);
      sessionStorage.removeItem('userFormData');
      navigate(`/users/${userId}`, {
        state: { message: 'ユーザー情報を更新しました。' },
      });
    } catch (e) {
      console.error('Error updating user:', e);
    } finally {
      setLoading(false);
    }
  };

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
          <BackButton />
          <AppButton
            color="primary"
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
          >
            {loading ? '登録中...' : '登録'}
          </AppButton>
        </ButtonSection>
      </Paper>
    </>
  );
}
