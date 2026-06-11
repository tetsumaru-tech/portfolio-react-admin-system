import type { RegisterOptions } from 'react-hook-form';

import type { UserFormData } from './UserFormData';

import type { SelectOption } from '@/types';

export type Row = {
  key: keyof UserFormData;
  label: string;
  maxLength?: number;
  minLength?: number;
  type?: 'text' | 'date' | 'select' | 'password' | 'password_confirmation';
  rules?: RegisterOptions<UserFormData>;
  options?: SelectOption<string>[];
  confirmValue?: (data: UserFormData) => string;
  showInEdit?: boolean;
  showInConfirm?: boolean;
};
