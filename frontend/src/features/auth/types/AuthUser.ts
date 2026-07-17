import { type Role } from '@/features/auth/types';
import { type YMD } from '@/types';

export type AuthUser = {
  id: number;
  lastName: string;
  firstName: string;
  fullName: string;
  email: string;
  birthday: YMD;
  role: Role;
};
