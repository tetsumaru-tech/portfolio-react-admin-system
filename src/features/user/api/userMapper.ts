import {
  type User,
  type UserFormData,
  type CreateUserInput,
  type UpdateUserInput,
  type Gender,
  GENDERS,
} from '@/features/user/types';

/**
 * ストレージに保存するユーザー情報の型
 */
type UserStorage = {
  id: number | null;
  lastName: string;
  firstName: string;
  email: string;
  birthday: string;
  gender: Gender;
};

/**
 * ユーザー関連のデータ変換関数を提供するオブジェクト
 */
export const userMapper = {
  /**
   * フォームデータをユーザー作成入力に変換する
   * @param data フォームデータ
   * @returns ユーザー作成入力
   */
  toCreateInput: (data: UserFormData): CreateUserInput => ({
    lastName: data.lastName,
    firstName: data.firstName,
    email: data.email,
    gender: data.gender,
    birthday: data.birthday,
  }),

  /**
   * フォームデータをユーザー更新入力に変換する
   * @param data フォームデータ
   * @returns ユーザー更新入力
   */
  toUpdateInput: (data: UserFormData): UpdateUserInput => ({
    lastName: data.lastName,
    firstName: data.firstName,
    email: data.email,
    gender: data.gender,
    birthday: data.birthday,
  }),

  /**
   * APIレスポンスをフォームデータに変換する
   * @param user APIから取得したユーザー情報
   * @returns フォームデータ
   */
  fromApi: (user: User): UserFormData => ({
    id: user.id,
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    gender: user.gender,
    birthday: user.birthday,
  }),

  /**
   * フォームデータをストレージ形式に変換する
   * @param form フォームデータ
   * @returns ストレージ形式のデータ
   */
  toStorage(form: UserFormData) {
    return {
      ...form,
      birthday: form.birthday,
    };
  },

  /**
   * ストレージデータをフォームデータに変換する
   * @param data ストレージから取得したデータ
   * @returns フォームデータ
   */
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

/**
 * 指定されたデータがUserStorage型かどうかをチェックする
 * @param data チェックするデータ
 * @returns UserStorage型の場合はtrue、そうでない場合はfalse
 */
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
