import { TextField } from '@mui/material';
import {
  Controller,
  type Control,
  type FieldErrors,
  type Path,
} from 'react-hook-form';

type Props<T extends Record<string, unknown>> = {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  maxLength?: number;
};

/**
 * テキスト入力用のフォームフィールドコンポーネント
 * React Hook Form の Controller でフォームと連携します。
 * @template T フォームデータの型
 * @param name フィールド名
 * @param control React Hook Form のコントロール
 * @param errors フィールドエラー
 * @param label ラベル
 * @param maxLength 最大文字数（オプション）
 */
export function FormTextField<T extends Record<string, unknown>>({
  name,
  control,
  errors,
  label,
  maxLength,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          slotProps={{
            htmlInput: {
              maxLength,
            },
          }}
          error={!!errors[name]}
          helperText={
            (errors[name]?.message as string) ||
            (maxLength
              ? `${String(field.value ?? '').length}/${maxLength}`
              : '')
          }
        />
      )}
    />
  );
}
