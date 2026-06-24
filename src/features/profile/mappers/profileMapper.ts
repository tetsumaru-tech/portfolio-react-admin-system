import type { UpdateProfileRequest } from '@/features/profile/schema';
import {
  type ProfileFormData,
  type ProfileResponse,
  type UpdateProfileApiRequest,
  type UpdateProfileInput,
} from '@/features/profile/types';
import { type Role, ROLES } from '@/features/user/types';
import { type Gender, GENDERS } from '@/features/user/types';
import { type YMD } from '@/types';

/**
 * ストレージに保存するプロファイル情報の型
 */
type ProfileStorage = {
  lastName: string;
  firstName: string;
  email: string;
  birthday: string;
  gender: Gender;
  role: Role;
};

export const profileMapper = {
  /**
   * フォームデータをストレージ形式に変換する
   * @param form フォームデータ
   * @returns ストレージ形式のデータ
   */
  toStorage(form: ProfileFormData) {
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
  fromStorage(data: unknown): ProfileFormData {
    if (!isProfileStorage(data)) {
      throw new Error('Invalid storage data');
    }
    return {
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      gender: data.gender,
      birthday: data.birthday,
      role: data.role,
    };
  },

  /**
   * フォームデータをAPIの更新リクエスト形式に変換する
   * @param fromData プロフィールフォームデータ
   * @returns UpdateUserRequest APIに送信する更新リクエストオブジェクト
   */
  toUpdateRequest(fromData: ProfileFormData): UpdateProfileRequest {
    return {
      lastName: fromData.lastName,
      firstName: fromData.firstName,
      email: fromData.email,
      birthday: fromData.birthday,
      gender: fromData.gender,
    };
  },

  /**
   * APIレスポンスを内部プロフィール型に変換する
   * @param user APIから取得したプロフィール情報
   * @returns 変換後のUserオブジェクト
   */
  fromResponse(profile: ProfileResponse): ProfileFormData {
    return {
      lastName: profile.last_name,
      firstName: profile.first_name,
      email: profile.email,
      birthday: profile.birthday as YMD,
      gender: profile.gender,
      role: profile.role,
    };
  },

  /**
   * 内部のUpdateUserInputをAPI送信用の形式に変換する
   * @param profile UpdateProfileInput 型のプロフィール情報
   * @returns UpdateProfileApiRequest APIに送信するオブジェクト（スネークケース）
   */
  toUpdateApiRequest(profile: UpdateProfileInput): UpdateProfileApiRequest {
    return {
      last_name: profile.lastName ?? '',
      first_name: profile.firstName ?? '',
      email: profile.email ?? '',
      birthday: profile.birthday as YMD,
      gender: profile.gender as Gender,
    };
  },
};

/**
 * 指定されたデータがProfileStorage型かどうかをチェックする
 * @param data チェックするデータ
 * @returns ProfileStorage型の場合はtrue、そうでない場合はfalse
 */
function isProfileStorage(data: unknown): data is ProfileStorage {
  if (typeof data !== 'object' || data === null) return false;

  const d = data as Record<string, unknown>;
  return (
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
    (typeof d.birthday === 'string' || d.birthday === null) &&
    'role' in d &&
    ROLES.includes(d.role as Role)
  );
}
