import { Typography, Paper, CircularProgress } from '@mui/material';
import { useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ButtonSection, AppButton, BackButton } from '@/components';
import { ROUTES } from '@/constants';
import { userMapper } from '@/features/user/api';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '@/features/user/api';
import {
  FormSection,
  FormRowContainer,
  FormRow,
} from '@/features/user/components';
import { userFormRows } from '@/features/user/constants';
import { createUserSchema, updateUserSchema } from '@/features/user/schema';
import type { UserFormData } from '@/features/user/types';
import { getApiError, formatFieldValue, isValidationError } from '@/utils';

/**
 * ユーザー確認ページコンポーネント
 *
 * ユーザー入力内容を表示し、登録または更新を確定します。
 *
 * @returns ユーザー確認ページの JSX
 */
export function UserConfirmPage() {
  const { id } = useParams<{ id: string }>();
  const rawId = id ?? '';
  const parsedUserId = Number(rawId);
  const userId = rawId === 'create' || rawId === '' || Number.isNaN(parsedUserId)
    ? 0
    : parsedUserId;
  const location = useLocation();
  const navigate = useNavigate();
  const formData: UserFormData | null = location.state?.formData
    ? userMapper.fromStorage(location.state.formData)
    : null;

  const isCreate =
    rawId === 'create' ||
    rawId === '' ||
    formData?.id === null ||
    formData?.id === undefined ||
    formData?.id === 0;

  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();
  const mutation = isCreate ? createUserMutation : updateUserMutation;

  const handleSubmit = async () => {
    if (!formData) return;

    try {
      if (isCreate) {
        const request = userMapper.toCreateRequest(formData);
        const validateRequest = createUserSchema.parse(request);
        await createUserMutation.mutateAsync(validateRequest);
      } else {
        const request = userMapper.toUpdateRequest(formData);
        const validateRequest = updateUserSchema.parse(request);
        await updateUserMutation.mutateAsync(validateRequest);
      }
      navigate(ROUTES.users());
    } catch (error) {
      if (isValidationError(error)) {
        navigate(isCreate ? ROUTES.userCreate() : ROUTES.userEdit(userId), {
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
  const rows = useMemo(() => {
    if (!formData) return [];
    return userFormRows
      .filter((row) => {
        if (row.showInConfirm === false) {
          return false;
        }
        if (!isCreate && row.key === 'password') {
          return false;
        }
        return true;
      })
      .map((row) => ({
        label: row.label,
        value: row.confirmValue
          ? row.confirmValue(formData)
          : formatFieldValue(row, formData[row.key]),
      }));
  }, [formData, isCreate]);

  if (!formData || typeof formData !== 'object') {
    navigate(isCreate ? ROUTES.userCreate() : ROUTES.userEdit(userId), {
      replace: true,
    });
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
          <BackButton
            disabled={mutation.isPending}
            onClick={() => {
              navigate(isCreate ? ROUTES.userCreate() : ROUTES.userEdit(userId), {
                state: {
                  formData: userMapper.toStorage(location.state?.formData),
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
