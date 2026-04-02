import { Grid } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export function FormRowContainer({ children }: Props) {
  return (
    <Grid
      container
      sx={{
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      {children}
    </Grid>
  );
}
