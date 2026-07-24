import type { RegisterOptions } from 'react-hook-form';

import type { UserFormData, UserPasswordFormData } from '@/features/user/types';
import type { SelectOption } from '@/types';

export type Row = {
  key: keyof UserFormData;
  label: string;
  dispLabel?: string;
  maxLength?: number;
  minLength?: number;
  type?: 'text' | 'date' | 'select' | 'password' | 'password_confirmation';
  rules?: RegisterOptions<UserFormData>;
  options?: SelectOption<string>[];
  showValue?: (data: UserFormData) => string;
  confirmValue?: (data: UserFormData) => string;
  showInDetail?: boolean;
  showInEdit?: boolean;
  showInConfirm?: boolean;
};

export type UpdatePasswordRow = {
  key: keyof UserPasswordFormData;
  label: string;
  maxLength?: number;
  minLength?: number;
  type?: 'password' | 'password_confirmation';
  rules?: RegisterOptions<UserPasswordFormData>;
  // options?: SelectOption<string>[];
  confirmValue?: (data: UserPasswordFormData) => string;
};
