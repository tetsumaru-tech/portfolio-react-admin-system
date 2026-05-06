import { TextField, MenuItem } from '@mui/material';
import {
  Controller,
  type Control,
  type FieldErrors,
  type Path,
  type RegisterOptions,
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
  rules?: RegisterOptions<T, Path<T>>;
};

export function FormSelect<T extends Record<string, any>>({
  name,
  control,
  errors,
  label,
  options,
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
          select
          label={label}
          fullWidth
          error={!!errors[name]}
          helperText={
            (errors[name]?.message as string) ||
            (rules?.maxLength
              ? `${String(field.value ?? '').length}/${maxLength}`
              : '')
          }
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
