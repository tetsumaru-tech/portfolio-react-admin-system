import type { Role } from '@/features/user/types';
import type { YMD } from '@/types';

export type LoginResponse = {
  user: {
    id: number;
    last_name: string;
    first_name: string;
    email: string;
    birthday: YMD;
    role: Role;
  };
};
