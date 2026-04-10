import type {
  User,
  UserFormData,
  CreateUserInput,
  UpdateUserInput,
} from '@/features/user/types';

import dayjs from 'dayjs';

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
    console.log('toStorage birthday:', form.birthday);
    console.log('toStorage birthday isDayjs:', dayjs.isDayjs(form.birthday));
    return {
      ...form,
      birthday: form.birthday
        ? form.birthday.format('YYYY-MM-DD')
        : form.birthday,
    };
  },
  // Storage → UI
  fromStorage(data: any): UserFormData {
    console.log('fromStorage birthday:', data.birthday);
    console.log('fromStorage birthday isDayjs:', dayjs.isDayjs(data.birthday));
    return {
      ...data,
      birthday: data.birthday ? dayjs(data.birthday) : null,
    };
  },
};
