import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { users } from '@/features/user/types';
import { Grid, Typography, Paper, Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { User, UserFormData } from '@/features/user/types';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function UserDetailEdit() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const foundUser = users.find((u) => u.id === userId);
  if (!foundUser) {
    return <div>ユーザーが見つかりません。</div>;
  }

  const [user, setUser] = useState<User>(foundUser);

  function handleChange(field: keyof User, value: string): void {
    setUser((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(): void {
    const formData: UserFormData = {
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      birthday: user.birthday,
    };
    navigate(`/users/${user.id}/confirm`, { state: { formData } });
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
  const navigate = useNavigate();
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          ユーザー編集
        </Typography>
        <Box border={1} borderColor="divider">
          {[
            { key: 'lastName', label: '性', value: user.lastName },
            { key: 'firstName', label: '名', value: user.firstName },
            { key: 'email', label: 'メール', value: user.email },
            {
              key: 'birthday',
              label: '誕生日',
              value: user.birthday,
              type: 'date',
            },
          ].map((row, i, rows) => (
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
                  bottom: i === rows.length - 1 ? 0 : 1,
                }}
              >
                {row['type'] === 'date' ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={dayjs(row.value ? dayjs(row.value) : null)}
                      format="YYYY-MM-DD"
                      disableFuture
                      onChange={(newValue) => {
                        handleChange(
                          row.key as keyof User,
                          newValue ? newValue.format('YYYY-MM-DD') : '',
                        );
                      }}
                    />
                  </LocalizationProvider>
                ) : (
                  <TextField
                    fullWidth
                    value={row.value}
                    onChange={(e) => {
                      handleChange(row.key as keyof User, e.target.value);
                    }}
                  />
                )}
              </Grid>
            </Grid>
          ))}
        </Box>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/users/${user.id}`)}
        >
          戻る
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, ml: 1 }}
          onClick={() => handleSubmit()}
        >
          確認
        </Button>
      </Paper>
    </>
  );
}
