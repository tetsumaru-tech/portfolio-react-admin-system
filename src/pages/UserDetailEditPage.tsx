import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { users } from '@/features/user/types';
import { Typography, Paper, TextField } from '@mui/material';
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

  const location = useLocation();

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return <div>ユーザーが見つかりません。</div>;
  }

  const saved = sessionStorage.getItem('userFormData');

  const [formData, setFormData] = useState<UserFormData>(
    saved
      ? JSON.parse(saved)
      : {
          lastName: user.lastName,
          firstName: user.firstName,
          email: user.email,
          birthday: user.birthday,
        },
  );

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('userFormData', JSON.stringify(formData));
  }, [formData]);

  function handleChange(field: keyof UserFormData, value: string): void {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(): void {
    if (
      !formData.lastName ||
      !formData.firstName ||
      !formData.email ||
      !formData.birthday
    ) {
      alert('すべてのフィールドを入力してください。');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert('有効なメールアドレスを入力してください。');
      return;
    }
    navigate(`/users/${userId}/confirm`, { state: { formData } });
  }

  type Row = {
    key: keyof UserFormData;
    label: string;
    value: string;
    maxLength?: number;
    type?: 'date';
  };

  const rows: Row[] = [
    { key: 'lastName', label: '性', value: formData.lastName, maxLength: 10 },
    { key: 'firstName', label: '名', value: formData.firstName, maxLength: 10 },
    { key: 'email', label: 'メール', value: formData.email, maxLength: 100 },
    {
      key: 'birthday',
      label: '誕生日',
      value: formData.birthday,
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
            <BackButton
              onClick={() => {
                navigate(`/`);
              }}
            />
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
