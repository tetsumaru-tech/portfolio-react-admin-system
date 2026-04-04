import { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Alert } from '@mui/material';
import { getAge } from '@/types';
import { userApi } from '@/features/user';
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
  if (!userId) return null;

  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state?.formData as UserFormData;
  useEffect(() => {
    if (!formData) {
      navigate(`/users/${userId}/edit`, { replace: true });
    }
  }, [formData, navigate, userId]);
  if (!formData) return null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      setLoading(true);
      await userApi.create(formData);
      sessionStorage.removeItem('userFormData');
      navigate(`/users/${userId}`, {
        state: { message: 'ユーザー情報を更新しました。' },
      });
    } catch (e) {
      setError('ユーザー情報の更新に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const rows = useMemo(
    () => [
      {
        label: '名前',
        value: `${formData.lastName} ${formData.firstName}`,
      },
      { label: 'メール', value: formData.email },
      { label: '誕生日', value: formData.birthday },
      { label: '年齢', value: getAge(formData.birthday) },
    ],
    [formData],
  );

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          ユーザー確認
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <FormSection>
          {rows.map((row, i, rows) => (
            <FormRowContainer key={row.label}>
              <FormRow label={row.label} isLast={i === rows.length - 1}>
                <Typography>{row.value}</Typography>
              </FormRow>
            </FormRowContainer>
          ))}
        </FormSection>
        <ButtonSection>
          <BackButton />
          <AppButton color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? '登録中...' : '登録'}
          </AppButton>
        </ButtonSection>
      </Paper>
    </>
  );
}
