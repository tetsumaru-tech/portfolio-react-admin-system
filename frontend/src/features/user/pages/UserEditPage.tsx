import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AppButton, BackButton, ButtonSection } from '@/components';
import { ROUTES } from '@/constants';
import { userMapper, useUserDetailQuery } from '@/features/user/api';
import {
  FormDatePicker,
  FormPasswordField,
  FormRow,
  FormRowContainer,
  FormSection,
  FormSelect,
  FormTextField,
} from '@/features/user/components';
import { userFormRows } from '@/features/user/constants';
import { userFormSchema } from '@/features/user/schema';
import { type UserFormData } from '@/features/user/types';
import { applyServerErrors } from '@/utils';

/**
 * ユーザー編集ページコンポーネント
 */
export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const rawId = id ?? '';
  const parsedUserId = Number(rawId);
  const isCreate =
    rawId === 'create' || rawId === '' || Number.isNaN(parsedUserId);
  const userId = isCreate ? 0 : parsedUserId;
  const location = useLocation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setError,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      id: isCreate ? null : userId,
      lastName: '',
      firstName: '',
      email: '',
      gender: '',
      birthday: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const { data, isSuccess } = useUserDetailQuery(isCreate ? 0 : userId);

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
    if (isCreate) {
      navigate(ROUTES.userConfirm('create'), {
        state: { formData: userMapper.toStorage(data) },
      });
    } else {
      navigate(ROUTES.userConfirm(userId), {
        state: {
          formData: userMapper.toStorage(data),
        },
      });
    }
  };

  const rows = userFormRows.filter(
    (row) => isCreate || row.showInEdit !== false,
  );

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
        <Typography variant="h6" gutterBottom>
          {isCreate ? 'ユーザー新規作成' : 'ユーザー編集'}
        </Typography>
        <Grid container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormSection>
              {rows.map((row, i, rows) => (
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
                      />
                    ) : row.type === 'select' ? (
                      <FormSelect<UserFormData>
                        name={row.key}
                        control={control}
                        errors={errors}
                        label={row.label}
                        options={row.options ?? []}
                      />
                    ) : row.type === 'password' ? (
                      <FormPasswordField<UserFormData>
                        name={row.key}
                        control={control}
                        errors={errors}
                        label={row.label}
                        minLength={row.minLength}
                      />
                    ) : (
                      <FormTextField<UserFormData>
                        name={row.key}
                        control={control}
                        errors={errors}
                        label={row.label}
                        maxLength={row.maxLength}
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
            navigate(ROUTES.users());
          }}
        >
          キャンセル
        </BackButton>
        <AppButton type="submit">確認へ</AppButton>
      </ButtonSection>
    </form>
  );
}
