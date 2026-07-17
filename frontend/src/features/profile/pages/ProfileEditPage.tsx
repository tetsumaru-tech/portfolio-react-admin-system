import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

import { ButtonSection, AppButton, BackButton } from '@/components';
import { ROUTES } from '@/constants';
import { useProfileQuery } from '@/features/profile';
import { profileRows } from '@/features/profile/constants';
import { profileMapper } from '@/features/profile/mappers';
import { profileSchema } from '@/features/profile/schema';
import { type ProfileFormData } from '@/features/profile/types';
import {
  FormSection,
  FormRowContainer,
  FormRow,
  FormTextField,
  FormDatePicker,
  FormSelect,
} from '@/features/user/components';
import { applyServerErrors } from '@/utils';

/**
 * プロファイル編集ページコンポーネント
 * ユーザーのプロフィール情報編集フォームを表示し、確認ページへ遷移します。
 */
export function ProfileEditPage() {
  const { data, isSuccess } = useProfileQuery();

  const location = useLocation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      gender: '',
      birthday: '',
    },
  });

  useEffect(() => {
    if (location.state?.formData) {
      reset(profileMapper.fromStorage(location.state.formData));
      applyServerErrors(location.state?.errors, setError);
      return;
    }

    if (isSuccess && data) {
      reset(profileMapper.fromResponse(data));
    }
  }, [location.state, isSuccess, data, reset, setError]);

  const navigate = useNavigate();

  const onSubmit = (data: ProfileFormData) => {
    navigate(ROUTES.profileConfirm(), {
      state: {
        formData: profileMapper.toStorage(data),
      },
    });
  };

  if (!data) {
    navigate(ROUTES.top());
    return null;
  }

  const rows = profileRows.filter((row) => {
    return row.showInEdit !== false;
  });

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
                    {row.type === 'date' ? (
                      <FormDatePicker<ProfileFormData>
                        name={row.key}
                        control={control}
                        errors={errors}
                        label={row.label}
                      />
                    ) : row.type === 'select' ? (
                      <FormSelect<ProfileFormData>
                        name={row.key}
                        control={control}
                        errors={errors}
                        label={row.label}
                        options={row.options ?? []}
                        disabled={row.disabledInEdit}
                      />
                    ) : (
                      <FormTextField<ProfileFormData>
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
        <AppButton type="submit">確認へ</AppButton>
      </ButtonSection>
    </form>
  );
}
