import type { YMD } from '@/types';

export type User = {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  birthday: YMD;
  createdAt: Date;
};

export type UserSearchCondition = {
  name?: string;
  email?: string;
};
