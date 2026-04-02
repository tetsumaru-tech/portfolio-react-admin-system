import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { users } from '@/features/user/types';
import { Grid, Typography, Paper, Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { UserFormData } from '@/features/user/types';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import {
  FormSection,
  FormRowContainer,
  FormRow,
  ButtonSection,
  AppButton,
  BackButton,
} from '@/features/user/components';

export function UserDetailEditPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return <div>ユーザーが見つかりません。</div>;
  }

  const [form, setForm] = useState<UserFormData>({
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    birthday: user.birthday,
  });

  const navigate = useNavigate();

  function handleChange(field: keyof UserFormData, value: string): void {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(): void {
    if (!form.lastName || !form.firstName || !form.email || !form.birthday) {
      alert('すべてのフィールドを入力してください。');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      alert('有効なメールアドレスを入力してください。');
      return;
    }
    navigate(`/users/${userId}/confirm`, { state: { form } });
  }

  type Row = {
    key: keyof UserFormData;
    label: string;
    value: string;
    maxLength?: number;
    type?: 'date';
  };

  const rows: Row[] = [
    { key: 'lastName', label: '性', value: form.lastName, maxLength: 10 },
    { key: 'firstName', label: '名', value: form.firstName, maxLength: 10 },
    { key: 'email', label: 'メール', value: form.email, maxLength: 100 },
    {
      key: 'birthday',
      label: '誕生日',
      value: form.birthday,
      type: 'date',
    },
  ];

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          ユーザー編集
        </Typography>
        <Typography variant="body2" color="text.secondary">
          内容を編集して確認へ進んでください
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormSection>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormSection>
                {rows.map((row, i, rows) => (
                  <FormRowContainer key={row.key}>
                    <FormRow label={row.label} isLast={i === rows.length - 1}>
                      <Typography variant="subtitle2">
                        {row.type === 'date' ? (
                          <DatePicker
                            value={row.value ? dayjs(row.value) : null}
                            format="YYYY-MM-DD"
                            disableFuture
                            slotProps={{ textField: { fullWidth: true } }}
                            onChange={(newValue) => {
                              handleChange(
                                row.key,
                                newValue ? newValue.format('YYYY-MM-DD') : '',
                              );
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            value={row.value}
                            onChange={(e) => {
                              handleChange(row.key, e.target.value);
                            }}
                            slotProps={{
                              htmlInput: {
                                maxLength: row.maxLength ?? 8,
                              },
                            }}
                            helperText={`${row.value.length}/${row.maxLength}`}
                          />
                        )}
                      </Typography>
                    </FormRow>
                  </FormRowContainer>
                ))}
              </FormSection>
            </LocalizationProvider>
          </FormSection>
          <ButtonSection>
            <BackButton />
            <AppButton
              color="primary"
              onClick={() => handleSubmit()}
              type="submit"
            >
              確認
            </AppButton>
          </ButtonSection>
        </form>
      </Paper>
    </>
  );
}
