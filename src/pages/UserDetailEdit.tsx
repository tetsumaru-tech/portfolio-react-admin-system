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

export default function UserDetailEdit() {
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

  const gridItemStyleLabel = {
    backgroundColor: '#f5f5f5',
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
  };
  const gridItemStyleValue = {
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
  };

  type Row = {
    key: keyof UserFormData;
    label: string;
    value: string;
    type?: 'date';
  };

  const rows: Row[] = [
    { key: 'lastName', label: '性', value: form.lastName },
    { key: 'firstName', label: '名', value: form.firstName },
    { key: 'email', label: 'メール', value: form.email },
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box border={1} borderColor="divider">
              {rows.map((row, i, rows) => (
                <Grid
                  container
                  key={row.key}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Grid size={{ xs: 12, md: 3 }} sx={gridItemStyleLabel}>
                    <Typography variant="subtitle2">{row.label}</Typography>
                  </Grid>
                  <Grid
                    size={{ xs: 12, md: 9 }}
                    sx={{
                      ...gridItemStyleValue,
                      borderBottom: i === rows.length - 1 ? 0 : 1,
                    }}
                  >
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
                      />
                    )}
                  </Grid>
                </Grid>
              ))}
            </Box>
          </LocalizationProvider>

          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/users/${userId}`)}
            >
              戻る
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
              type="submit"
            >
              確認
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
}
