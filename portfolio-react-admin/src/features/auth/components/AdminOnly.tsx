import { useAuth } from '@/features/auth/hooks';

type props = {
  children: React.ReactNode;
};

/**
 * 現在のユーザーが管理者（role === 'admin'）の場合のみ
 * 子要素を表示するコンポーネントです。
 */
export function AdminOnly({ children }: props) {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return null;
  }
  return <>{children}</>;
}
