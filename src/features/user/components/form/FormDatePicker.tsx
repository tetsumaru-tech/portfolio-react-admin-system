import { TextField } from '@mui/material';
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

export function FormDatePicker<T extends Record<string, any>>({
  name,
  control,
  errors,
  label,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: `${label}は必須です`,
      }}
      render={({ field }) => (
        <DatePicker
          label={label}
          value={field.value ? dayjs(field.value) : null}
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
