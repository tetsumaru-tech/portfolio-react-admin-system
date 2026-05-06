import {
  type User,
  type UserFormData,
  type CreateUserInput,
  type UpdateUserInput,
  type Gender,
  GENDERS,
} from '@/features/user/types';

type UserStorage = {
  id: number | null;
  lastName: string;
  firstName: string;
  email: string;
  birthday: string;
  gender: Gender;
};

export const userMapper = {
  // UI → Create
  toCreateInput: (data: UserFormData): CreateUserInput => ({
    lastName: data.lastName,
    firstName: data.firstName,
    email: data.email,
    gender: data.gender,
    birthday: data.birthday ?? '', // ← string統一
  }),

  // UI → Update
  toUpdateInput: (data: UserFormData): UpdateUserInput => ({
    lastName: data.lastName,
    firstName: data.firstName,
    email: data.email,
    gender: data.gender,
    birthday: data.birthday ?? '', // ← string統一
  }),

  // API → Form
  fromApi: (user: User): UserFormData => ({
    id: user.id,
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    gender: user.gender,
    birthday: user.birthday ?? '', // ← string統一
  }),

  // UI → Storage
  toStorage(form: UserFormData) {
    return {
      ...form,
      birthday: form.birthday ?? '',
    };
  },

  // Storage → UI
  fromStorage(data: unknown): UserFormData {
    if (!isUserStorage(data)) {
      throw new Error('Invalid storage data');
    }
    return {
      id: data.id,
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      gender: data.gender,
      birthday: data.birthday,
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
    'gender' in d &&
    typeof d.gender === 'string' &&
    GENDERS.includes(d.gender as Gender) &&
    'birthday' in d &&
    (typeof d.birthday === 'string' || d.birthday === null)
  );
}
