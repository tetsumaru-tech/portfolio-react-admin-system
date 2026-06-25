import { profileMapper } from '@/features/profile/mappers';
import type {
  ProfileResponse,
  UpdateProfileInput,
  UpdateProfilePasswordInput,
} from '@/features/profile/types';
import { apiFetch } from '@/lib/api';
import { sleep } from '@/utils';

export const profileApi = {
  get: async () => {
    const res = await apiFetch<ProfileResponse>('/profile');
    return res;
  },

  updateProfile: async (data: UpdateProfileInput): Promise<ProfileResponse> => {
    const res = await apiFetch<ProfileResponse>(`/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(profileMapper.toUpdateApiRequest(data)),
    });
    await sleep(1000); // テスト用の遅延
    return res;
  },

  updatePassword: async (data: UpdateProfilePasswordInput) => {
    const res = await apiFetch<ProfileResponse>(`/profile/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(profileMapper.toUpdatePasswordApiRequest(data)),
    });
    await sleep(1000); // テスト用の遅延
    return res;
  },
};
