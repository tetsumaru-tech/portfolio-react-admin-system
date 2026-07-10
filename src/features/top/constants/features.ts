import type { SvgIconComponent } from '@mui/icons-material';
import {
  AdminPanelSettings,
  Block,
  Group,
  Key,
  Lock,
  Logout,
  NotificationsActive,
  Person,
  Search,
  TableRows,
  Verified,
} from '@mui/icons-material';

/**
 * トップページの機能項目を表す型
 * @property {string} label - 機能の表示ラベル
 * @property {SvgIconComponent} icon - 機能に対応するアイコンコンポーネント
 */
type feature = {
  label: string;
  icon: SvgIconComponent;
};

/**
 * トップページに表示する機能一覧
 * @type {feature[]}
 */
export const features: feature[] = [
  {
    icon: Lock,
    label: 'Sanctum認証',
  },
  {
    icon: AdminPanelSettings,
    label: '権限制御（Admin / User）',
  },
  {
    icon: Group,
    label: 'ユーザーCRUD',
  },
  {
    icon: Person,
    label: 'プロフィール管理',
  },
  {
    icon: Key,
    label: 'パスワード変更',
  },
  {
    icon: Search,
    label: 'リアルタイム検索',
  },
  {
    icon: TableRows,
    label: 'サーバーサイドページング・ソート',
  },
  {
    icon: Verified,
    label: 'Zodバリデーション',
  },
  {
    icon: NotificationsActive,
    label: 'Toast通知',
  },
  {
    icon: Logout,
    label: '401自動ログアウト',
  },
  {
    icon: Block,
    label: '403 Forbidden対応',
  },
] satisfies feature[];
