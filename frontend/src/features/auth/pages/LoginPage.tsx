import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { ErrorMessage } from '@/components';
import { ROUTES } from '@/constants';
import { useLoginMutation } from '@/features/auth/api';
import { loginSchema, type LoginFormData } from '@/features/auth/schema';
import { FormPasswordField, FormTextField } from '@/features/user/components';

const demoAccounts = {
  admin: {
    email: 'admin@example.com',
    password: 'password',
  },
  user: {
    email: 'user@example.com',
    password: 'password',
  },
} as const;

/**
 * ログインページ
 */
export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      const from = location.state?.from?.pathname ?? ROUTES.users();
      navigate(from, { replace: true });
    } catch {
      setError('root', {
        message: 'メールアドレスまたはパスワードが違います',
      });
    }
  };

  const fillDemoAccount = (role: keyof typeof demoAccounts) => {
    const account = demoAccounts[role];

    setValue('email', account.email, { shouldValidate: true });
    setValue('password', account.password, { shouldValidate: true });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, margin: '0 auto', mt: 8 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="h5">Login</Typography>

          <FormTextField
            name="email"
            control={control}
            errors={errors}
            label="メールアドレス"
          />

          <FormPasswordField
            name="password"
            control={control}
            errors={errors}
            label="パスワード"
          />

          {errors.root && <ErrorMessage message={errors.root.message} />}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'ログイン中' : 'ログイン'}
          </Button>

          <Divider />

          <Stack spacing={1}>
            <Typography variant="subtitle2">デモ用アカウント</Typography>

            <Button
              type="button"
              variant="outlined"
              fullWidth
              onClick={() => fillDemoAccount('admin')}
            >
              管理者アカウントを入力
            </Button>

            <Button
              type="button"
              variant="outlined"
              fullWidth
              onClick={() => fillDemoAccount('user')}
            >
              一般ユーザーを入力
            </Button>

            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
            >
              権限による機能の違いをご確認いただけます。
            </Typography>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
