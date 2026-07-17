import { type SelectOption } from '@/types';

export const ROLES = ['admin', 'user'] as const;
export type Role = (typeof ROLES)[number];

export const roleOptions: SelectOption<Role>[] = [
  { value: 'admin', label: '管理者' },
  { value: 'user', label: 'ユーザー' },
];
