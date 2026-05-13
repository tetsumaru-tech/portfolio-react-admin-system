import { Grid, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useUserDetailQuery } from '@/features/user/api';
import { userMapper } from '@/features/user/api';
import {
  FormSection,
  FormRowContainer,
  FormRow,
  FormTextField,
  FormDatePicker,
  FormSelect,
  ButtonSection,
  AppButton,
  BackButton,
} from '@/features/user/components';
import { userFormRows } from '@/features/user/constants';
import { type UserFormData } from '@/features/user/types';
import { applyServerErrors } from '@/utils';

/**
 * ユーザー編集ページコンポーネント
 */
export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id ?? '');
  const isAdd = userId === 0;
  const location = useLocation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setError,
  } = useForm<UserFormData>({
    defaultValues: {
      id: userId,
      lastName: '',
      firstName: '',
      email: '',
      gender: '',
      birthday: '',
    },
  });

  const { data, isSuccess } = useUserDetailQuery(userId);

  useEffect(() => {
    if (location.state?.formData) {
      reset(userMapper.fromStorage(location.state.formData));
      applyServerErrors(location.state?.errors, setError);
      return;
    }

    if (isSuccess && data) {
      reset(userMapper.fromApi(data));
    }
  }, [location.state, isSuccess, data, reset, setError]);

  const navigate = useNavigate();

  const onSubmit = (data: UserFormData) => {
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      alert('有効なメールアドレスを入力してください。');
      return;
    }

    if (isAdd) {
      navigate(`/users/new/confirm`, {
        state: { formData: userMapper.toStorage(data) },
      });
    } else {
      navigate(`/users/${userId}/confirm`, {
        state: {
          formData: userMapper.toStorage(data),
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        sx={{
          p: 4,
          maxWidth: 900,
          mx: 'auto',
          width: '100%',
        }}
      >
        <Grid container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormSection>
              {userFormRows.map((row, i, rows) => (
                <FormRowContainer key={row.key}>
                  <FormRow
                    label={row.label}
                    isLast={i === rows.length - 1}
                    required={!!row.rules?.required}
                  >
                    {row.type === 'date' ? (
                      <FormDatePicker<UserFormData>
                        name={row.key}
                        control={control}
                        errors={errors}
                        label={row.label}
                        rules={row.rules}
                      />
                    ) : row.type === 'select' ? (
                      <FormSelect<UserFormData>
                        name={row.key}
                        control={control}
                        errors={errors}
                        label={row.label}
                        rules={row.rules}
                        options={row.options ?? []}
                      />
                    ) : (
                      <FormTextField<UserFormData>
                        name={row.key}
                        control={control}
                        errors={errors}
                        label={row.label}
                        maxLength={row.maxLength}
                        rules={row.rules}
                      />
                    )}
                  </FormRow>
                </FormRowContainer>
              ))}
            </FormSection>
            <input type="hidden" {...register('id')} />
          </LocalizationProvider>
        </Grid>
      </Paper>
      <ButtonSection>
        <BackButton
          onClick={() => {
            navigate(`/users`);
          }}
        >
          キャンセル
        </BackButton>
        <AppButton type="submit">確認へ</AppButton>
      </ButtonSection>
    </form>
  );
}
