import { Grid, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useForm, type RegisterOptions } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { USER_FORM_STORAGE_KEY } from '@/features/user';
import { userApi, userMapper } from '@/features/user/api';
import {
  FormSection,
  FormRowContainer,
  FormRow,
  FormTextField,
  FormDatePicker,
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
    maxLength?: number;
    type?: 'text' | 'date' | 'select';
    rules?: RegisterOptions<UserFormData>;
  };

  const rows: Row[] = [
    {
      key: 'lastName',
      label: '性',
      maxLength: 10,
      rules: {
        required: '姓は必須です',
        maxLength: { value: 10, message: '性は10文字以内です' },
      },
    },
    {
      key: 'firstName',
      label: '名',
      maxLength: 10,
      rules: {
        required: '名は必須です',
        maxLength: { value: 10, message: '名は10文字以内です' },
      },
    },
    {
      key: 'email',
      label: 'メール',
      maxLength: 100,
      rules: {
        required: 'メールは必須です',
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'メール形式が不正です',
        },
      },
    },
    {
      key: 'birthday',
      label: '誕生日',
      type: 'date',
      rules: {
        required: '誕生日は必須です',
      },
    },
  ];

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
                      <FormDatePicker<UserFormData>
                        name={row.key}
                        control={control}
                        errors={errors}
                        label={row.label}
                        rules={row.rules}
                      />
                    ) : (
                      <FormTextField<UserFormData>
                        name={row.key}
                        control={control}
                        errors={errors}
                        label={row.label}
                        maxLength={row.maxLength}
                        rules={row.rules}
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
