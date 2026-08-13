import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AppButton, BackButton, ButtonSection } from '@/components';
import { ROUTES } from '@/constants';
import { useUpdateProfileMutation } from '@/features/user/api';
import {
  FormPasswordField,
  FormRow,
  FormRowContainer,
  FormSection,
} from '@/features/user/components';
import { userPasswordRows } from '@/features/user/constants';
import { userPasswordSchema } from '@/features/user/schema';
import { type UserPasswordFormData } from '@/features/user/types';
import { applyServerErrors, isValidationError } from '@/utils';

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

  useEffect(() => {
    if (location.state?.formData) {
      reset(location.state.formData);
      return;
    }
  }, [location.state, reset]);

  const navigate = useNavigate();

  const onSubmit = async (data: UserPasswordFormData) => {
    try {
      await updatePasswordMutation.mutateAsync(data);
      navigate(ROUTES.userDetail(userId));
    } catch (error) {
      if (isValidationError(error) && error.errors) {
        applyServerErrors(error.errors, setError);
      }
      // 422以外は useApiMutation がトーストで通知するため、ここでは何もしない
    }
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
        <Typography variant="h6" gutterBottom>
          ユーザーパスワード更新
        </Typography>
        <Grid container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormSection>
              {rows.map((row, i, rows) => (
                <FormRowContainer key={row.key}>
                  <FormRow
                    label={row.label}
                    isLast={i === rows.length - 1}
                    required={row.required}
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
          disabled={updatePasswordMutation.isPending}
          onClick={() => {
            navigate(ROUTES.userDetail(userId));
          }}
        >
          キャンセル
        </BackButton>
        <AppButton type="submit" disabled={updatePasswordMutation.isPending}>
          更新
        </AppButton>
      </ButtonSection>
    </form>
  );
}
