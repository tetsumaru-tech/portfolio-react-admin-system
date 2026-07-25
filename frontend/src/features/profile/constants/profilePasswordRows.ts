import { type UpdatePasswordRow } from '@/features/profile/types';

/**
 * プロフィールパスワード変更の行定義
 */
export const profilePasswordRows: UpdatePasswordRow[] = [
  {
    key: 'currentPassword',
    label: '現在のパスワード',
    type: 'password',
    required: true,
  },
  {
    key: 'password',
    label: '新しいパスワード',
    type: 'password',
    required: true,
  },
  {
    key: 'passwordConfirmation',
    label: '新しいパスワード（確認）',
    type: 'password',
    required: true,
  },
] satisfies UpdatePasswordRow[];
