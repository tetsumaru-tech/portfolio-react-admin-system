import { Grid, Typography } from '@mui/material';

type Props = {
  label: string;
  children: React.ReactNode;
  isLast?: boolean;
  required?: boolean;
};

export function FormRow({
  label,
  children,
  isLast = false,
  required = false,
}: Props) {
  return (
    <>
      <Grid
        size={{ xs: 12, md: 3 }}
        sx={{
          backgroundColor: '#f5f5f5',
          p: 2,
          borderBottom: isLast ? 0 : 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="subtitle2">
          {label}
          {required && ' 【必須】'}
        </Typography>
      </Grid>
      <Grid
        size={{ xs: 12, md: 9 }}
        sx={{
          p: 2,
          borderBottom: isLast ? 0 : 1,
          borderColor: 'divider',
        }}
      >
        {children}
      </Grid>
    </>
  );
}
