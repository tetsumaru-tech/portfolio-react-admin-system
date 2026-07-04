import { Paper, Typography } from '@mui/material';

import { AppButton } from '@/components';
import { ROUTES } from '@/constants';

/**
 * 403 Forbidden ページコンポーネント
 *
 * このコンポーネントは、ユーザーがアクセス権を持っていないページに
 * アクセスした際に表示されます。プロフィールページへの遷移ボタンを含みます。
 *
 * @returns 403 メッセージを表示するページ要素
 */
export function ForbiddenPage() {
  return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        403
      </Typography>
      <Typography sx={{ mb: 3 }}>
        このページにアクセスする権限がありません。
      </Typography>
      <AppButton href={ROUTES.profile()}>プロフィールへ戻る</AppButton>
    </Paper>
  );
}
