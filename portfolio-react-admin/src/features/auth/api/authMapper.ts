import type { AuthUser, LoginResponse } from '@/features/auth/types';

export const authMapper = {
  /**
   * APIのレスポンスからAuthUserに変換する
   * @param response APIのレスポンス
   * @returns AuthUser
   */
  fromResponse(response: LoginResponse['user']): AuthUser {
    return {
      id: response.id,
      lastName: response.last_name,
      firstName: response.first_name,
      fullName: `${response.last_name} ${response.first_name}`,
      email: response.email,
      birthday: response.birthday,
      role: response.role,
    };
  },
};
