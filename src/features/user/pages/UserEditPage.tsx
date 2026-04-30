import { Grid, TextField, Button, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
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
import type { ValidationErrors } from '@/types';

export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id ?? '');
  const isAdd = userId === 0;
  const location = useLocation();

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: location.state?.formData ?? {
      id: null,
      lastName: '',
      firstName: '',
      email: '',
      birthday: dayjs('2000-01-01'),
    },
  });

  // useEffect(() => {
  //   const saved = sessionStorage.getItem(USER_FORM_STORAGE_KEY);
  //   if (saved) return;
  //   const fetch = async () => {
  //     const data = await userApi.fetchUser(userId);
  //     if (data) {
  //       setFormData(
  //         userMapper.fromStorage({
  //           id: data.id,
  //           lastName: data.lastName,
  //           firstName: data.firstName,
  //           email: data.email,
  //           birthday: data.birthday,
  //         }),
  //       );
  //     }
  //   };
  //   fetch();
  // }, [userId]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   sessionStorage.setItem(
  //     USER_FORM_STORAGE_KEY,
  //     JSON.stringify(userMapper.toStorage(formData)),
  //   );
  // }, [formData]);

  // function handleChange(field: keyof UserFormData, value: string): void {
  //   setFormData((prev) => {
  //     const updated = userMapper.fromStorage({
  //       ...prev,
  //       birthday: prev.birthday ? prev.birthday.format('YYYY-MM-DD') : null,
  //       [field]: value,
  //     });
  //     return updated;
  //   });
  // }

  const onSubmit = (data: UserFormData) => {
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      alert('有効なメールアドレスを入力してください。');
      return;
    }

    if (isAdd) {
      navigate(`/users/new/confirm`, {
        state: { formData: userMapper.toStorage(data) },
      });
    } else {
      navigate(`/users/${userId}/confirm`, {
        state: {
          formData: userMapper.toStorage(data),
        },
      });
    }
  };

  type Row = {
    key: keyof UserFormData;
    label: string;
    // value: string | Dayjs | null;
    maxLength?: number;
    type?: 'date';
    required: boolean;
  };

  const rows: Row[] = [
    { key: 'lastName', label: '性', maxLength: 10, required: true },
    { key: 'firstName', label: '名', maxLength: 10, required: true },
    { key: 'email', label: 'メール', maxLength: 100, required: true },
    {
      key: 'birthday',
      label: '誕生日',
      type: 'date',
      required: true,
    },
  ];

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     <Paper sx={{ p: 2 }}>
  //       <Typography variant="h6" gutterBottom>
  //         {isAdd ? 'ユーザー作成' : 'ユーザー編集'}
  //       </Typography>
  //       <Typography variant="body2" color="text.secondary">
  //         内容を編集して確認へ進んでください
  //       </Typography>
  //       <form
  //         onSubmit={(e) => {
  //           e.preventDefault();
  //           handleSubmit();
  //         }}
  //       >
  //         <FormSection>
  //           <LocalizationProvider dateAdapter={AdapterDayjs}>
  //             <FormSection>
  //               {rows.map((row, i, rows) => (
  //                 <FormRowContainer key={row.key}>
  //                   <FormRow label={row.label} isLast={i === rows.length - 1}>
  //                     <Typography variant="subtitle2">
  //                       {row.type === 'date' ? (
  //                         <DatePicker
  //                           value={row.value ? dayjs(row.value) : null}
  //                           format="YYYY-MM-DD"
  //                           disableFuture
  //                           slotProps={{
  //                             textField: {
  //                               fullWidth: true,
  //                               error: !!formErrors.birthday,
  //                               helperText: formErrors.birthday?.[0],
  //                             },
  //                           }}
  //                           onChange={(newValue) => {
  //                             handleChange(
  //                               row.key,
  //                               newValue ? newValue.format('YYYY-MM-DD') : '',
  //                             );
  //                           }}
  //                         />
  //                       ) : (
  //                         <TextField
  //                           fullWidth
  //                           value={row.value}
  //                           onChange={(e) => {
  //                             handleChange(row.key, e.target.value);
  //                           }}
  //                           slotProps={{
  //                             htmlInput: {
  //                               maxLength: row.maxLength ?? 8,
  //                             },
  //                           }}
  //                           error={!!formErrors[row.key]}
  //                           helperText={
  //                             `${String(row.value).length}/${row.maxLength}` +
  //                             (formErrors[row.key]?.[0]
  //                               ? ` (${formErrors[row.key]?.[0]})`
  //                               : '')
  //                           }
  //                         />
  //                       )}
  //                     </Typography>
  //                   </FormRow>
  //                 </FormRowContainer>
  //               ))}
  //             </FormSection>
  //           </LocalizationProvider>
  //         </FormSection>
  //         <ButtonSection>
  //           <BackButton />
  //           <AppButton color="primary" onClick={handleSubmit} type="button">
  //             確認
  //           </AppButton>
  //         </ButtonSection>
  //       </form>
  //     </Paper>
  //   </form>
  // );

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
                    {row.type === 'date' ? (
                      <Controller
                        name={row.key}
                        control={control}
                        rules={{ required: row.label + 'は必須です' }}
                        render={({ field }) => (
                          <DatePicker
                            value={field.value ? dayjs(field.value) : null}
                            format="YYYY-MM-DD"
                            disableFuture
                            onChange={(date) =>
                              field.onChange(
                                date ? date.format('YYYY-MM-DD') : '',
                              )
                            }
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                error: !!errors[row.key],
                                helperText: errors[row.key]?.message,
                              },
                            }}
                          />
                        )}
                      />
                    ) : (
                      <Controller
                        name={row.key}
                        control={control}
                        rules={{ required: row.label + 'は必須です' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={row.label}
                            fullWidth
                            error={!!errors[row.key]}
                            helperText={errors[row.key]?.message}
                          />
                        )}
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
        <BackButton>キャンセル</BackButton>
        <AppButton type="submit">確認へ</AppButton>
      </ButtonSection>
    </form>
  );
}
