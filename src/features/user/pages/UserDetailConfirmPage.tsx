import { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Alert } from '@mui/material';
import { getAge } from '@/types';
import { USER_FORM_STORAGE_KEY } from '@/features/user';
import { userApi, userMapper } from '@/features/user/api';
import type { UserFormData } from '@/features/user/types';
import type { YMD } from '@/types';

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
  const navigate = useNavigate();
  console.log('confirm page', location.state);
  const formData: UserFormData = userMapper.fromStorage(
    location.state?.formData,
  );
  if (!formData || typeof formData !== 'object') {
    return null;
  }
  console.log('confirm page formData', formData);

  useEffect(() => {
    if (formData === undefined) {
      navigate(`/users/${userId}/edit`, { replace: true });
    }
  }, [formData, navigate, userId]);
  const isAdd = formData.id === null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (loading) return; // 多重クリック防止
    try {
      setError(null);
      setLoading(true);
      isAdd
        ? await userApi.create(userMapper.toCreateInput(formData))
        : await userApi.update(userId, userMapper.toUpdateInput(formData));
      sessionStorage.removeItem(USER_FORM_STORAGE_KEY);
      navigate(`/users`, {
        state: {
          message: isAdd
            ? 'ユーザーを登録しました'
            : 'ユーザー情報を更新しました。',
        },
      });
    } catch (e) {
      setError(
        isAdd
          ? 'ユーザー情報の登録に失敗しました。'
          : 'ユーザー情報の更新に失敗しました。',
      );
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
      {
        label: '誕生日',
        value: formData.birthday.format('YYYY-MM-DD'),
      },
      {
        label: '年齢',
        value: formData.birthday
          ? getAge(formData.birthday.format('YYYY-MM-DD') as YMD)
          : '',
      },
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
          <BackButton disabled={loading} />
          <AppButton color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? '登録中...' : '登録'}
          </AppButton>
        </ButtonSection>
      </Paper>
    </>
  );
}
