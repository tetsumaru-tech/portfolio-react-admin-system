import type { RegisterOptions } from 'react-hook-form';

import type {
  ProfileFormData,
  ProfilePasswordFormData,
} from '@/features/profile/types';
import type { SelectOption } from '@/types';

export type Row = {
  key: keyof ProfileFormData;
  label: string;
  dispLabel?: string;
  maxLength?: number;
  minLength?: number;
  type?: 'text' | 'date' | 'select';
  rules?: RegisterOptions<ProfileFormData>;
  options?: SelectOption<string>[];
  showValue?: (data: ProfileFormData) => string;
  confirmLabel?: (data: ProfileFormData) => string;
  confirmValue?: (data: ProfileFormData) => string;
  showInDetail?: boolean;
  showInEdit?: boolean;
  showInConfirm?: boolean;
  disabledInEdit?: boolean;
};

export type UpdatePasswordRow = {
  key: keyof ProfilePasswordFormData;
  label: string;
  maxLength?: number;
  minLength?: number;
  type?: 'password' | 'password_confirmation';
};
