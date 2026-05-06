import type { Gender } from '@/features/user/types';

export function formatGender(gender: Gender): string {
  switch (gender) {
    case 'male':
      return '男性';
    case 'female':
      return '女性';
    default:
      return '未指定';
  }
}
