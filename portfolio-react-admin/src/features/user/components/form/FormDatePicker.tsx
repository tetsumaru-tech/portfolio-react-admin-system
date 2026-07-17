import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
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
};

/**
 * React Hook Form と MUI の DatePicker を連携するコンポーネント
 * @template T フォームの値の型
 * @template T フォームデータの型
 * @param name フィールド名
 * @param control React Hook Form のコントロール
 * @param errors フィールドエラー
 * @param label ラベル
 */
export function FormDatePicker<T extends Record<string, unknown>>({
  name,
  control,
  errors,
  label,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          label={label}
          value={toDayjs(field.value)}
          maxDate={dayjs()}
          format="YYYY-MM-DD"
          onChange={(date) =>
            field.onChange(date ? date.format('YYYY-MM-DD') : '')
          }
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!errors[name],
              helperText: errors[name]?.message as string,
            },
          }}
        />
      )}
    />
  );
}

const toDayjs = (value: unknown): dayjs.Dayjs | null => {
  return typeof value === 'string' ? dayjs(value) : null;
};
