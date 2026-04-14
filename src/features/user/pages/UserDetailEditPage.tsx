import { Typography, Paper, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { USER_FORM_STORAGE_KEY } from '@/features/user';
import { userApi, userMapper } from '@/features/user/api';
import {
  FormSection,
  FormRowContainer,
  FormRow,
  ButtonSection,
  AppButton,
  BackButton,
} from '@/features/user/components';
import type { UserFormData } from '@/features/user/types';

export function UserDetailEditPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id ?? '');
  const isAdd = userId === 0;

  const getInitialFormData = (): UserFormData => {
    const saved = sessionStorage.getItem(USER_FORM_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.id === null) {
        return userMapper.fromStorage(parsed);
      }
      if (!isAdd && parsed.id === userId) return userMapper.fromStorage(parsed);
    }
    return {
      id: null,
      lastName: '',
      firstName: '',
      email: '',
      birthday: dayjs('2000-01-01'),
    };
  };
  const [formData, setFormData] = useState<UserFormData>(getInitialFormData);

  useEffect(() => {
    const saved = sessionStorage.getItem(USER_FORM_STORAGE_KEY);
    if (saved) return;
    const fetch = async () => {
      const data = await userApi.getUser(userId);
      if (data) {
        setFormData(
          userMapper.fromStorage({
            id: data.id,
            lastName: data.lastName,
            firstName: data.firstName,
            email: data.email,
            birthday: data.birthday,
          }),
        );
      }
    };
    fetch();
  }, [userId]);

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem(
      USER_FORM_STORAGE_KEY,
      JSON.stringify(userMapper.toStorage(formData)),
    );
  }, [formData]);

  function handleChange(field: keyof UserFormData, value: string): void {
    setFormData((prev) => {
      const updated = userMapper.fromStorage({
        ...prev,
        birthday: prev.birthday ? prev.birthday.format('YYYY-MM-DD') : null,
        [field]: value,
      });
      return updated;
    });
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
    if (isAdd) {
      navigate(`/users/new/confirm`, {
        state: { formData: userMapper.toStorage(formData) },
      });
    } else {
      navigate(`/users/${userId}/confirm`, {
        state: {
          formData: userMapper.toStorage(formData),
        },
      });
    }
  }

  type Row = {
    key: keyof UserFormData;
    label: string;
    value: string | Dayjs | null;
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
          {isAdd ? 'ユーザー作成' : 'ユーザー編集'}
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
                            helperText={`${String(row.value).length}/${row.maxLength}`}
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
            <AppButton color="primary" onClick={handleSubmit} type="button">
              確認
            </AppButton>
          </ButtonSection>
        </form>
      </Paper>
    </>
  );
}
