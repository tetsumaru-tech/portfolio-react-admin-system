import { Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ButtonSection, AppButton, BackButton } from '@/components';
import { ROUTES } from '@/constants';
import { useProfileQuery } from '@/features/profile';
import { profileRows } from '@/features/profile/constants';
import { profileMapper } from '@/features/profile/mappers';
import {
  FormSection,
  FormRowContainer,
  FormRow,
} from '@/features/user/components';

/**
 *
 */
export function ProfilePage() {
  const { data } = useProfileQuery();
  const navigate = useNavigate();

  if (!data) {
    navigate(ROUTES.top());
    return null;
  }

  const profile = profileMapper.fromResponse(data);
  const rows = profileRows
    .filter((row) => {
      if (row.showInConfirm === false) {
        return false;
      }
      return true;
    })
    .map((row) => ({
      label: row.label,
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
          <BackButton />
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
