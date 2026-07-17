import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import {
  Controller,
  type Control,
  type FieldErrors,
  type Path,
} from 'react-hook-form';

type Props<T extends Record<string, any>> = {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  minLength?: number;
};

/**
 * テキスト入力用のフォームフィールドコンポーネント
 * React Hook Form の Controller でフォームと連携します。
 * @template T フォームデータの型
 * @param name フィールド名
 * @param control React Hook Form のコントロール
 * @param errors フィールドエラー
 * @param label ラベル
 * @param minLength 最小文字数（オプション）
 */
export function FormPasswordField<T extends Record<string, any>>({
  name,
  control,
  errors,
  label,
  minLength,
}: Props<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          type={showPassword ? 'text' : 'password'}
          label={label}
          fullWidth
          slotProps={{
            htmlInput: {
              minLength,
            },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          error={!!errors[name]}
          helperText={
            (errors[name]?.message as string) ||
            (minLength ? `大文字・小文字・数字を含む${minLength}文字以上` : '')
          }
        />
      )}
    />
  );
}
