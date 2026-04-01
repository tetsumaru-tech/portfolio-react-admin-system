import { useParams } from 'react-router-dom';
import { users } from '@/features/user/types';
import { Grid, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAge } from '@/types';

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return <div>ユーザーが見つかりません。</div>;
  }

  const gridItemStyleLabel = {
    backgroundColor: '#f5f5f5',
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
  };
  const gridItemStyleValue = {
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
  };
  const navigate = useNavigate();
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          ユーザー詳細
        </Typography>
        <Box border={1} borderColor="divider">
          {[
            { label: '名前', value: `${user.lastName} ${user.firstName}` },
            { label: 'メール', value: user.email },
            { label: '誕生日', value: user.birthday },
            { label: '年齢', value: getAge(user.birthday) },
            {
              label: '登録日',
              value:
                user.createdAt.toLocaleDateString() +
                ' ' +
                user.createdAt.toLocaleTimeString(),
            },
          ].map((row, i, rows) => (
            <Grid
              container
              key={row.label}
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Grid size={{ xs: 12, md: 3 }} sx={gridItemStyleLabel}>
                <Typography variant="subtitle2">{row.label}</Typography>
              </Grid>
              <Grid
                size={{ xs: 12, md: 9 }}
                sx={{
                  ...gridItemStyleValue,
                  bottom: i === rows.length - 1 ? 0 : 1,
                }}
              >
                <Typography>{row.value}</Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(-1);
            }}
          >
            戻る
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/users/${user.id}/edit`);
            }}
          >
            編集
          </Button>
        </Box>
      </Paper>
    </>
  );
}
