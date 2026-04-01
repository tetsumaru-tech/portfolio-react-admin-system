import { useParams } from 'react-router-dom';
import { users } from '@/features/user/types';
import { Grid, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const user = users.find((u) => u.id === userId);
  if (!user) return;

  const girdItemStyleLabel = {
    backgroundColor: '#f5f5f5',
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
  };
  const girdItemStyleValue = {
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
  };
  const navigate = useNavigate();

  return (
    <>
      <Box border={1} borderColor="divider">
        {[
          { label: '名前', value: `${user.lastName} ${user.firstName}` },
          { label: 'メール', value: user.email },
          { label: '誕生日', value: user.birthday },
        ].map((row, i, rows) => (
          <Grid
            container
            key={i}
            sx={{
              '&:hover': {
                backgroundColor: '#cacaca',
              },
            }}
          >
            <Grid size={{ xs: 12, md: 3 }} sx={girdItemStyleLabel}>
              <Typography variant="subtitle2">{row.label}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }} sx={girdItemStyleValue}>
              <Typography>{row.value}</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => {
          navigate(`/users/${user.id}/edit`);
        }}
      >
        編集
      </Button>
    </>
  );
}
