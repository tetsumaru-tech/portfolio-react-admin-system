import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Paper } from '@mui/material';
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
import { applyServerErrors } from '@/utils';

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
      applyServerErrors(location.state?.errors, setError);
      return;
    }

    // if (isSuccess && data) {
    //   reset(profileMapper.fromApi(data));
    // }
  }, [location.state, data, isSuccess, reset, setError]);

  const navigate = useNavigate();

  const onSubmit = (data: ProfilePasswordFormData) => {
    mutation.mutate(data);
    navigate(ROUTES.profile());
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
          onClick={() => {
            navigate(ROUTES.profile());
          }}
        >
          キャンセル
        </BackButton>
        <AppButton type="submit">更新</AppButton>
      </ButtonSection>
    </form>
  );
}
