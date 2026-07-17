import { TextField, MenuItem } from '@mui/material';
import {
  Controller,
  type Control,
  type FieldErrors,
  type Path,
} from 'react-hook-form';

type Option = {
  value: string;
  label: string;
};

type Props<T extends Record<string, any>> = {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  options: Option[];
  disabled?: boolean;
};

/**
 * 選択可能なオプションを持つフォームセレクトコンポーネント。
 * @template T - フォームデータの型
 * @param props - コンポーネントのプロパティ
 * @param props.name - フィールド名
 * @param props.control - React Hook Formのコントロール
 * @param props.errors - フィールドエラー
 * @param props.label - ラベル
 * @param props.options - 選択肢のオプション配列
 */
export function FormSelect<T extends Record<string, unknown>>({
  name,
  control,
  errors,
  label,
  options,
  disabled,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          select
          label={label}
          fullWidth
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
