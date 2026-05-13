import { TextField } from '@mui/material';
import {
  Controller,
  type Control,
  type FieldErrors,
  type Path,
  type RegisterOptions,
} from 'react-hook-form';

type Props<T extends Record<string, any>> = {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  maxLength?: number;
  rules?: RegisterOptions<T, Path<T>>;
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
 * @param rules バリデーションルール（オプション）
 */
export function FormTextField<T extends Record<string, any>>({
  name,
  control,
  errors,
  label,
  maxLength,
  rules,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
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
            (rules?.maxLength
              ? `${String(field.value ?? '').length}/${maxLength}`
              : '')
          }
        />
      )}
    />
  );
}
