import { Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { useUpdatePasswordMutation } from '@/features/profile/api';
import { profileRows } from '@/features/profile/constants';
import { profileMapper } from '@/features/profile/mappers';
import { updateProfileSchema } from '@/features/profile/schema';
import type { ProfileFormData } from '@/features/profile/types';
import {
  FormSection,
  FormRowContainer,
  FormRow,
  ButtonSection,
  AppButton,
  BackButton,
} from '@/features/user/components';
import { getApiError, formatFieldValue, isValidationError } from '@/utils';

/**
 * プロフィール確認ページコンポーネント
 *
 * プロフィール入力内容を表示し、登録または更新を確定します。
 */
export function ProfileConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData: ProfileFormData | null = location.state?.formData
    ? profileMapper.fromStorage(location.state.formData)
    : null;

  const mutation = useUpdatePasswordMutation();

  const handleSubmit = async () => {
    if (!formData) return;

    try {
      const request = profileMapper.toUpdateRequest(formData);
      const validateRequest = updateProfileSchema.parse(request);
      await mutation.mutateAsync(validateRequest);
      navigate(ROUTES.users());
    } catch (error) {
      if (isValidationError(error)) {
        navigate(ROUTES.profileEdit(), {
          state: {
            formData,
            errors: getApiError(error)?.errors,
          },
        });
        return;
      }
      throw error;
    }
  };

  const rows = profileRows
    .filter((row) => {
      return row.showInConfirm !== false;
    })
    .map((row) => ({
      label: row.label,
      value: row.confirmValue
        ? row.confirmValue(formData!)
        : formatFieldValue(row, formData![row.key]),
    }));

  if (!formData || typeof formData !== 'object') {
    navigate(ROUTES.profileEdit(), { replace: true });
  }

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          プロフィール確認
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
          <BackButton
            disabled={mutation.isPending}
            onClick={() => {
              navigate(ROUTES.profileEdit(), {
                state: {
                  formData: profileMapper.toStorage(location.state?.formData),
                },
              });
            }}
          />
          <AppButton
            color="primary"
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <CircularProgress size={20} /> : '登録'}
          </AppButton>
        </ButtonSection>
      </Paper>
    </>
  );
}
