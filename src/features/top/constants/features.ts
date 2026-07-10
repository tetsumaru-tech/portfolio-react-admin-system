import type { SvgIconComponent } from '@mui/icons-material';
import {
  AdminPanelSettings,
  Api,
  Apps,
  Badge,
  Block,
  Cached,
  CheckCircle,
  Construction,
  ErrorOutline,
  FactCheck,
  FindInPage,
  Lock,
  Login,
  Logout,
  ManageAccounts,
  Password,
  Person,
  Preview,
  QueryStats,
  Router,
  Rule,
  Search,
  Sort,
  Sync,
} from '@mui/icons-material';

/**
 * トップページの機能項目を表す型
 * @property {string} label - 機能の表示ラベル
 * @property {SvgIconComponent} icon - 機能に対応するアイコンコンポーネント
 */
type Feature = {
  icon: SvgIconComponent;
  label: string;
};

/**
 * 機能カテゴリを表す型
 * @property {string} title - カテゴリのタイトル
 * @property {Feature[]} skills - カテゴリに含まれる機能一覧
 */
type FeatureCategory = {
  title: string;
  skills: Feature[];
};

/**
 * トップページに表示する機能一覧
 * @type {feature[]}
 */
export const featureCategories: FeatureCategory[] = [
  {
    title: '認証・権限',
    skills: [
      {
        icon: Lock,
        label: 'Sanctum認証',
      },
      {
        icon: Login,
        label: 'ログイン・認証状態確認・ログアウト',
      },
      {
        icon: Logout,
        label: '401自動ログアウト',
      },
      {
        icon: AdminPanelSettings,
        label: '権限制御（Admin / User）',
      },
      {
        icon: Block,
        label: '403 Forbidden対応',
      },
      {
        icon: Router,
        label: 'ルーティングガード',
      },
    ],
  },
  {
    title: 'ユーザー管理',
    skills: [
      {
        icon: ManageAccounts,
        label: 'ユーザーCRUD',
      },
      {
        icon: Person,
        label: 'プロフィール管理',
      },
      {
        icon: Password,
        label: 'パスワード変更',
      },
    ],
  },
  {
    title: 'UI・画面操作',
    skills: [
      {
        icon: Search,
        label: 'リアルタイム検索',
      },
      {
        icon: Sort,
        label: 'サーバーサイドページング・ソート',
      },
      {
        icon: Sync,
        label: 'URLクエリ状態の保持',
      },
      {
        icon: CheckCircle,
        label: '確認ダイアログ',
      },
      {
        icon: Preview,
        label: '編集 → 確認 → 送信の2段階フォーム',
      },
      {
        icon: FindInPage,
        label: '404 / 403 エラーページ',
      },
      {
        icon: Badge,
        label: 'ローディング・空データ表示',
      },
    ],
  },
  {
    title: '品質・設計',
    skills: [
      {
        icon: Rule,
        label: 'Zodバリデーション',
      },
      {
        icon: Construction,
        label: 'React Hook Form',
      },
      {
        icon: Cached,
        label: 'React Query キャッシュ更新',
      },
      {
        icon: QueryStats,
        label: '共通Mutationフック',
      },
      {
        icon: Api,
        label: '共通APIクライアント（apiFetch）',
      },
      {
        icon: Apps,
        label: '共通UIコンポーネント',
      },
      {
        icon: CheckCircle,
        label: 'Toast通知',
      },
      {
        icon: ErrorOutline,
        label: 'サーバーエラーのフォーム反映',
      },
      {
        icon: FactCheck,
        label: 'Error Boundary対応',
      },
    ],
  },
] satisfies FeatureCategory[];
