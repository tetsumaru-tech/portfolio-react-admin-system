import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
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
  rules?: RegisterOptions<T, Path<T>>;
};

/**
 * 日付入力用の DatePicker コンポーネント
 * React Hook Form の Controller でフォームと連携します。
 */
export function FormDatePicker<T extends Record<string, unknown>>({
  name,
  control,
  errors,
  label,
  rules,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
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
