import type { Gender } from '@/features/user/types';

/**
 * 性別をフォーマットする関数
 * @param gender - 性別の値
 * @returns フォーマットされた性別文字列
 */
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
