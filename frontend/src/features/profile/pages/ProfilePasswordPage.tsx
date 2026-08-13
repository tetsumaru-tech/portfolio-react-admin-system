import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppButton, BackButton, ButtonSection } from '@/components';
import { ROUTES } from '@/constants';
import { useProfileQuery } from '@/features/profile';
import { useUpdateProfilePasswordMutation } from '@/features/profile/api';
import { profilePasswordRows } from '@/features/profile/constants';
import { profilePasswordSchema } from '@/features/profile/schema';
import type { ProfilePasswordFormData } from '@/features/profile/types';
import {
  FormPasswordField,
  FormRow,
  FormRowContainer,
  FormSection,
} from '@/features/user/components';
import { applyServerErrors, isValidationError } from '@/utils';

/**
 * プロフィールパスワード変更ページコンポーネント
 */
export function ProfilePasswordPage() {
  const location = useLocation();
  const mutation = useUpdateProfilePasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ProfilePasswordFormData>({
    resolver: zodResolver(profilePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const { data, isSuccess } = useProfileQuery();

  useEffect(() => {
    if (location.state?.formData) {
      reset(location.state.formData);
      return;
    }
  }, [location.state, data, isSuccess, reset]);

  const navigate = useNavigate();

  const onSubmit = async (data: ProfilePasswordFormData) => {
    try {
      await mutation.mutateAsync(data);
      navigate(ROUTES.profile());
    } catch (error) {
      if (isValidationError(error) && error.errors) {
        applyServerErrors(error.errors, setError);
      }
      // 422以外は useApiMutation がトーストで通知するため、ここでは何もしない
    }
  };

  const rows = profilePasswordRows;

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
          プロフィールパスワード更新
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
                    <FormPasswordField<ProfilePasswordFormData>
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
          </LocalizationProvider>
        </Grid>
      </Paper>
      <ButtonSection>
        <BackButton
          disabled={mutation.isPending}
          onClick={() => {
            navigate(ROUTES.profile());
          }}
        >
          キャンセル
        </BackButton>
        <AppButton type="submit" disabled={mutation.isPending}>
          更新
        </AppButton>
      </ButtonSection>
    </form>
  );
}
