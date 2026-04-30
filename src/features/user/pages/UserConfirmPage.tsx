import { Typography, Paper } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@/components';
import { USER_FORM_STORAGE_KEY } from '@/features/user';
import { userApi, userMapper } from '@/features/user/api';
import {
  FormSection,
  FormRowContainer,
  FormRow,
  ButtonSection,
  AppButton,
  BackButton,
} from '@/features/user/components';
import type { UserFormData } from '@/features/user/types';
import type { YMD } from '@/types';
import { getAge } from '@/types';
import { isApiError, getApiError } from '@/utils';

export function UserConfirmPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const location = useLocation();
  const navigate = useNavigate();
  const formData: UserFormData | null = location.state?.formData
    ? userMapper.fromStorage(location.state.formData)
    : null;
  const { showToast } = useToast();

  const isAdd = formData?.id === null;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: UserFormData) =>
      isAdd
        ? userApi.createUser(userMapper.toCreateInput(data))
        : userApi.updateUser(userId, userMapper.toUpdateInput(data)),
    onSuccess: () => {
      sessionStorage.removeItem(USER_FORM_STORAGE_KEY);

      queryClient.invalidateQueries({ queryKey: ['users'] });

      showToast(
        isAdd ? 'ユーザーを登録しました' : 'ユーザー情報を更新しました。',
      );
      navigate(`/users`);
    },
    onError: (error: unknown) => {
      if (isApiError(error)) {
        const err = getApiError(error);
        if (err) {
          if (err.status === 422 && err.errors) {
            navigate(`/users/${userId}/edit`, {
              state: {
                formData,
                errors: err.errors,
              },
              replace: false,
            });
          } else {
            showToast(err.message, 'error');
          }
        }
      } else {
        showToast('予期しないエラーです', 'error');
      }
    },
  });

  const handleSubmit = async () => {
    if (!formData) return;
    mutation.mutate(formData);
  };
  const rows = useMemo(() => {
    if (!formData) return [];
    return [
      {
        label: '名前',
        value: `${formData.lastName} ${formData.firstName}`,
      },
      { label: 'メール', value: formData.email },
      {
        label: '誕生日',
        value: formData.birthday ? formData.birthday.format('YYYY-MM-DD') : '',
      },
      {
        label: '年齢',
        value: formData.birthday
          ? getAge(formData.birthday.format('YYYY-MM-DD') as YMD)
          : '',
      },
    ];
  }, [formData]);

  if (!formData || typeof formData !== 'object') {
    navigate(`/users/${userId}/edit`, { replace: true });
  }

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          ユーザー確認
        </Typography>
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
          <BackButton disabled={mutation.isPending} />
          <AppButton
            color="primary"
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? '登録中...' : '登録'}
          </AppButton>
        </ButtonSection>
      </Paper>
    </>
  );
}
