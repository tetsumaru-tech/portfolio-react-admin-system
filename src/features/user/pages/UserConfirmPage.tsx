import { Typography, Paper, CircularProgress } from '@mui/material';
import { useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { userMapper } from '@/features/user/api';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '@/features/user/api';
import {
  FormSection,
  FormRowContainer,
  FormRow,
  ButtonSection,
  AppButton,
  BackButton,
} from '@/features/user/components';
import { userFormRows } from '@/features/user/constants';
import type { UserFormData } from '@/features/user/types';
import { formatFieldValue } from '@/utils/formatFieldValue';

/**
 * ユーザー確認ページコンポーネント
 *
 * ユーザー入力内容を表示し、登録または更新を確定します。
 *
 * @returns ユーザー確認ページの JSX
 */
export function UserConfirmPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const location = useLocation();
  const navigate = useNavigate();
  const formData: UserFormData | null = location.state?.formData
    ? userMapper.fromStorage(location.state.formData)
    : null;

  const isAdd =
    formData?.id === null || formData?.id === undefined || formData?.id === 0;

  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();
  const mutation = isAdd ? createUserMutation : updateUserMutation;

  const handleSubmit = async () => {
    if (!formData) return;
    await mutation.mutateAsync(formData);
    navigate(`/users`);
  };
  const rows = useMemo(() => {
    if (!formData) return [];
    return userFormRows
      .filter((row) => row.showInConfirm !== false)
      .map((row) => ({
        label: row.label,
        value: row.confirmValue
          ? row.confirmValue(formData)
          : formatFieldValue(row, formData[row.key]),
      }));
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
          <BackButton
            disabled={mutation.isPending}
            onClick={() => {
              navigate(`/users/${userId}/edit`, {
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
