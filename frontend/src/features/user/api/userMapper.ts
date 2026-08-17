import type {
  CreateUserRequest,
  UpdateUserRequest,
} from '@/features/user/schema';
import {
  type CreateUserApiRequest,
  type CreateUserInput,
  type Gender,
  GENDERS,
  type UpdateUserApiRequest,
  type UpdateUserInput,
  type User,
  type UserFormData,
  type UserResponse,
} from '@/features/user/types';
import { type YMD } from '@/types';

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
  password: string;
  passwordConfirmation: string;
};

/**
 * データグリッドのソートフィールドをAPIのソートフィールドに変換するためのマッピング
 */
const SORT_FIELD_MAP = {
  id: 'id',
  fullName: 'full_name',
  email: 'email',
  birthday: 'birthday',
} as const;

/**
 * ソートフィールドが有効なものかをチェックし、APIのソートフィールドに変換する
 */
type SortField = keyof typeof SORT_FIELD_MAP;

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
    password: data.password,
    passwordConfirmation: data.passwordConfirmation,
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
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    };
  },

  /**
   * フォームデータをAPIの作成リクエスト形式に変換する
   * @param fromData ユーザーフォームデータ
   * @returns CreateUserRequest APIに送信する作成リクエストオブジェクト
   */
  toCreateRequest(fromData: UserFormData): CreateUserRequest {
    return {
      lastName: fromData.lastName,
      firstName: fromData.firstName,
      email: fromData.email,
      birthday: fromData.birthday,
      gender: fromData.gender,
      password: fromData.password ?? '',
      passwordConfirmation: fromData.passwordConfirmation ?? '',
    };
  },

  /**
   * フォームデータをAPIの更新リクエスト形式に変換する
   * @param fromData ユーザーフォームデータ（idを含む）
   * @returns UpdateUserRequest APIに送信する更新リクエストオブジェクト
   */
  toUpdateRequest(fromData: UserFormData): UpdateUserRequest {
    return {
      id: Number(fromData.id),
      lastName: fromData.lastName,
      firstName: fromData.firstName,
      email: fromData.email,
      birthday: fromData.birthday,
      gender: fromData.gender,
    };
  },

  /**
   * APIレスポンスを内部ユーザー型に変換する
   * @param user APIから取得したユーザー情報
   * @returns 変換後のUserオブジェクト
   */
  fromResponse(user: UserResponse): User {
    return {
      id: user.id,
      lastName: user.last_name,
      firstName: user.first_name,
      email: user.email,
      birthday: user.birthday as YMD,
      gender: user.gender as Gender,
      role: user.role,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    };
  },

  /**
   * 内部のCreateUserInputをAPI送信用の形式に変換する
   * @param user CreateUserInput 型のユーザー情報
   * @returns CreateUserApiRequest APIに送信するオブジェクト（スネークケース）
   */
  toCreateApiRequest(user: CreateUserInput): CreateUserApiRequest {
    return {
      last_name: user.lastName,
      first_name: user.firstName,
      email: user.email,
      birthday: user.birthday as YMD,
      gender: user.gender as Gender,
      password: user.password ?? '',
      password_confirmation: user.passwordConfirmation ?? '',
    };
  },

  /**
   * 内部のUpdateUserInputをAPI送信用の形式に変換する
   * @param user UpdateUserInput 型のユーザー情報
   * @returns UpdateUserApiRequest APIに送信するオブジェクト（スネークケース）
   */
  toUpdateApiRequest(user: UpdateUserInput): UpdateUserApiRequest {
    return {
      last_name: user.lastName ?? '',
      first_name: user.firstName ?? '',
      email: user.email ?? '',
      birthday: user.birthday as YMD,
      gender: user.gender as Gender,
    };
  },

  /**
   * データグリッドのソートフィールドをAPIのソートフィールドに変換する
   * @param field データグリッドのソートフィールド
   * @returns APIのソートフィールドに対応する文字列、対応しない場合はundefined
   */
  toApiSortField(field: string): string | undefined {
    if (field in SORT_FIELD_MAP) {
      return SORT_FIELD_MAP[field as SortField];
    }
    return undefined;
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
