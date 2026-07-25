import type { UserFormData, UserPasswordFormData } from '@/features/user/types';
import type { SelectOption } from '@/types';

export type Row = {
  key: keyof UserFormData;
  label: string;
  dispLabel?: string;
  maxLength?: number;
  minLength?: number;
  type?: 'text' | 'date' | 'select' | 'password' | 'password_confirmation';
  required?: boolean;
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
  required?: boolean;
  confirmValue?: (data: UserPasswordFormData) => string;
};
