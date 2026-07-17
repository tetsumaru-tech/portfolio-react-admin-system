import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

import { ErrorMessage } from '@/components';
import { ROUTES } from '@/constants';
import { useLoginMutation } from '@/features/auth/api';
import { loginSchema, type LoginFormData } from '@/features/auth/schema';
import { FormPasswordField, FormTextField } from '@/features/user/components';

/**
 * ログインページ
 */
export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutaion = useLoginMutation();

  const {
    control,
    handleSubmit,
    setError,
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
      await loginMutaion.mutateAsync(data);
      const from = location.state?.from?.pathname ?? ROUTES.users();
      navigate(from, { replace: true });
    } catch {
      setError('root', { message: 'メールアドレスまたはパスワードが違います' });
    }
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
            disabled={loginMutaion.isPending}
          >
            {loginMutaion.isPending ? 'ログイン中' : 'ログイン'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
