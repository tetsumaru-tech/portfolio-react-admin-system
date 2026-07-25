import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AppButton, BackButton, ButtonSection } from '@/components';
import { ROUTES } from '@/constants';
import {
  userMapper,
  useUpdateProfileMutation,
  useUserDetailQuery,
} from '@/features/user/api';
import {
  FormPasswordField,
  FormRow,
  FormRowContainer,
  FormSection,
} from '@/features/user/components';
import { userPasswordRows } from '@/features/user/constants';
import { userPasswordSchema } from '@/features/user/schema';
import { type UserPasswordFormData } from '@/features/user/types';
import { applyServerErrors } from '@/utils';

/**
 * パスワード変更ページコンポーネント
 */
export function UserPasswordPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id ?? '');
  const location = useLocation();
  const updatePasswordMutation = useUpdateProfileMutation(userId);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<UserPasswordFormData>({
    resolver: zodResolver(userPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const { data, isSuccess } = useUserDetailQuery(userId);

  useEffect(() => {
    if (location.state?.formData) {
      reset(location.state.formData);
      applyServerErrors(location.state?.errors, setError);
      return;
    }

    if (isSuccess && data) {
      reset(userMapper.fromApi(data));
    }
  }, [location.state, isSuccess, data, reset, setError]);

  const navigate = useNavigate();

  const onSubmit = (data: UserPasswordFormData) => {
    updatePasswordMutation.mutate(data);
    navigate(ROUTES.userDetail(userId));
  };

  const rows = userPasswordRows;

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
              {rows.map((row, i, rows) => (
                <FormRowContainer key={row.key}>
                  <FormRow
                    label={row.label}
                    isLast={i === rows.length - 1}
                    required={!!row.rules?.required}
                  >
                    <FormPasswordField<UserPasswordFormData>
                      name={row.key}
                      control={control}
                      errors={errors}
                      label={row.label}
                      minLength={row.minLength}
                    />
                  </FormRow>
                </FormRowContainer>
              ))}
            </FormSection>
            <input type="hidden" value={userId} />
          </LocalizationProvider>
        </Grid>
      </Paper>
      <ButtonSection>
        <BackButton
          onClick={() => {
            navigate(ROUTES.userDetail(userId));
          }}
        >
          キャンセル
        </BackButton>
        <AppButton type="submit">更新</AppButton>
      </ButtonSection>
    </form>
  );
}
