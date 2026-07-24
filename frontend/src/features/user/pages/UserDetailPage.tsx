import { Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { AppButton, BackButton, ButtonSection } from '@/components';
import { Empty, ErrorMessage, Loading } from '@/components/feedback';
import { ROUTES } from '@/constants';
import { userMapper, useUserDetailQuery } from '@/features/user/api';
import {
  FormRow,
  FormRowContainer,
  FormSection,
} from '@/features/user/components';
import { userFormRows } from '@/features/user/constants';

/**
 * ユーザー詳細ページのコンポーネント。
 * URL のパラメーターからユーザー ID を取得し、
 * 該当ユーザーの詳細情報を表示します。
 */
export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const navigate = useNavigate();

  // React Query
  const { data: data, isLoading, isError } = useUserDetailQuery(userId);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMessage message="ユーザー情報の取得に失敗しました。" />;
  }
  if (!data) {
    return <Empty message="ユーザー情報が見つかりませんでした。" />;
  }

  const user = userMapper.fromStorage(data);
  const rows = userFormRows
    .filter((row) => {
      if (row.showInDetail === false) {
        return false;
      }
      return true;
    })
    .map((row) => {
      return {
        label: row.dispLabel ? row.dispLabel : row.label,
        value: row.showValue ? row.showValue(user) : String(user[row.key]),
      };
    });
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          ユーザー詳細
        </Typography>
        <FormSection>
          {rows.map((row, i, rows) => (
            <FormRowContainer key={row.label}>
              <FormRow label={row.label} isLast={i === rows.length - 1}>
                <Typography>{row.value}</Typography>
              </FormRow>
            </FormRowContainer>
          ))}
        </FormSection>
        <ButtonSection>
          <BackButton />
          <AppButton
            color="primary"
            onClick={() => {
              navigate(ROUTES.userEdit(userId));
            }}
          >
            編集
          </AppButton>
          <AppButton onClick={() => navigate(ROUTES.userPassowrdEdit(userId!))}>
            パスワード変更
          </AppButton>
        </ButtonSection>
      </Paper>
    </>
  );
}
