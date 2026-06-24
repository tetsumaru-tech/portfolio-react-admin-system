import { profileMapper } from '../mappers';

import type {
  ProfileResponse,
  UpdateProfileInput,
} from '@/features/profile/types';
import { apiFetch } from '@/lib/api';
import { sleep } from '@/utils';

export const profileApi = {
  get: async () => {
    const res = await apiFetch<ProfileResponse>('/profile');
    return res;
  },

  updateProfile: async (data: UpdateProfileInput): Promise<ProfileResponse> => {
    console.log(data);
    const res = await apiFetch<ProfileResponse>(`/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(profileMapper.toUpdateApiRequest(data)),
    });
    console.log(res);
    await sleep(1000); // テスト用の遅延
    return res;
  },
};
