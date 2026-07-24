import { Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppButton, BackButton, ButtonSection } from '@/components';
import { ErrorMessage, Loading } from '@/components/feedback';
import { ROUTES } from '@/constants';
import { useProfileQuery } from '@/features/profile';
import { profileRows } from '@/features/profile/constants';
import { profileMapper } from '@/features/profile/mappers';
import {
  FormRow,
  FormRowContainer,
  FormSection,
} from '@/features/user/components';

/**
 *
 */
export function ProfilePage() {
  const { data, isLoading, isError } = useProfileQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMessage message="ユーザー情報の取得に失敗しました。" />;
  }

  if (!data) {
    navigate(ROUTES.top());
    return null;
  }

  const profile = profileMapper.fromResponse(data);
  const rows = profileRows
    .filter((row) => {
      if (row.showInDetail === false) {
        return false;
      }
      return true;
    })
    .map((row) => ({
      label: row.dispLabel ? row.dispLabel : row.label,
      value: row.showValue ? row.showValue(profile) : String(profile[row.key]),
    }));

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          プロファイル ProfilePage
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
          <BackButton onClick={() => navigate(ROUTES.top())} />
          <AppButton
            color="primary"
            onClick={() => {
              navigate(ROUTES.profileEdit());
            }}
          >
            編集
          </AppButton>
        </ButtonSection>
      </Paper>
    </>
  );
}
