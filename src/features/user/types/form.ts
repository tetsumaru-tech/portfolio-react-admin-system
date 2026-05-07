import type { RegisterOptions } from 'react-hook-form';

import type { UserFormData } from './UserFormData';

import type { SelectOption } from '@/types';

export type Row = {
  key: keyof UserFormData;
  label: string;
  maxLength?: number;
  type?: 'text' | 'date' | 'select';
  rules?: RegisterOptions<UserFormData>;
  options?: SelectOption<string>[];
};
