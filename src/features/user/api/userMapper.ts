type UserStorage = {
  id: number | null;
  lastName: string;
  firstName: string;
  email: string;
  birthday: string;
};

import dayjs from 'dayjs';

import type {
  User,
  UserFormData,
  CreateUserInput,
  UpdateUserInput,
} from '@/features/user/types';

export const userMapper = {
  // UI → Create
  toCreateInput: (data: UserFormData): CreateUserInput => ({
    lastName: data.lastName,
    firstName: data.firstName,
    email: data.email,
    birthday: data.birthday?.format('YYYY-MM-DD') ?? '1970-01-01',
  }),
  // UI → Update
  toUpdateInput: (data: UserFormData): UpdateUserInput => ({
    lastName: data.lastName,
    firstName: data.firstName,
    email: data.email,
    birthday: data.birthday?.format('YYYY-MM-DD') ?? '1970-01-01',
  }),
  // API → UI
  toFromData: (user: User): UserFormData => ({
    id: user.id,
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    birthday: dayjs(user.birthday),
  }),
  // UI → Storage
  toStorage(form: UserFormData) {
    return {
      ...form,
      birthday: form.birthday
        ? form.birthday.format('YYYY-MM-DD')
        : form.birthday,
    };
  },
  // Storage → UI
  fromStorage(data: unknown): UserFormData {
    if (!isUserStorage(data)) {
      throw new Error('Invalid storage data');
    }
    return {
      ...data,
      birthday: data.birthday ? dayjs(data.birthday) : dayjs('2000-01-01'),
    };
  },
};

function isUserStorage(data: unknown): data is UserStorage {
  if (typeof data !== 'object' || data === null) return false;

  const d = data as Record<string, unknown>;

  return (
    'id' in d &&
    (typeof d.id === 'number' || d.id === null) &&
    'lastName' in d &&
    typeof d.lastName === 'string' &&
    'firstName' in d &&
    typeof d.firstName === 'string' &&
    'email' in d &&
    typeof d.email === 'string' &&
    'birthday' in d &&
    (typeof d.birthday === 'string' || d.birthday === null)
  );
}
