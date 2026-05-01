import { TextField } from '@mui/material';
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
  maxLength?: number;
};

export function FormTextField<T extends Record<string, any>>({
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
      rules={{
        required: `${label}は必須です`,
      }}
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
