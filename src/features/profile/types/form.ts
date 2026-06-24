import type { RegisterOptions } from 'react-hook-form';

import type { ProfileFormData } from '@/features/profile/types';
import type { SelectOption } from '@/types';

export type Row = {
  key: keyof ProfileFormData;
  label: string;
  maxLength?: number;
  minLength?: number;
  type?: 'text' | 'date' | 'select';
  rules?: RegisterOptions<ProfileFormData>;
  options?: SelectOption<string>[];
  showValue?: (data: ProfileFormData) => string;
  confirmLabel?: (data: ProfileFormData) => string;
  confirmValue?: (data: ProfileFormData) => string;
  showInEdit?: boolean;
  showInConfirm?: boolean;
  disabledInEdit?: boolean;
};
