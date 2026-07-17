import type { SvgIconComponent } from '@mui/icons-material';
import {
  AdminPanelSettings,
  Api,
  Apps,
  Badge,
  Block,
  Cached,
  CheckCircle,
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
        label: 'SPA認証（Sanctum）',
      },
      {
        icon: Login,
        label: 'ログイン・認証状態管理',
      },
      {
        icon: Logout,
        label: '401自動ログアウト',
      },
      {
        icon: AdminPanelSettings,
        label: 'ロールベース認可（Admin / User）',
      },
      {
        icon: Block,
        label: '403 Forbidden対応',
      },
      {
        icon: Router,
        label: 'ProtectedRoute / AdminRoute',
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
        label: 'URLクエリとの状態同期',
      },
      {
        icon: CheckCircle,
        label: '確認ダイアログ',
      },
      {
        icon: Preview,
        label: '確認画面付きフォーム',
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
    title: '設計・品質',
    skills: [
      {
        icon: Cached,
        label: 'React Queryによるキャッシュ管理',
      },
      {
        icon: Api,
        label: '共通APIクライアント',
      },
      {
        icon: Apps,
        label: '共通UIコンポーネント',
      },
      {
        icon: QueryStats,
        label: '共通Mutationフック',
      },
      {
        icon: CheckCircle,
        label: 'Toast通知',
      },
      {
        icon: ErrorOutline,
        label: 'サーバーバリデーション表示',
      },
      {
        icon: FactCheck,
        label: 'Error Boundary',
      },
    ],
  },
] satisfies FeatureCategory[];
