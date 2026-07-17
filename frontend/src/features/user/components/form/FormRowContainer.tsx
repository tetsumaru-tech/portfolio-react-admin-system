import { Grid } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

/**
 * フォーム行をラップするコンテナコンポーネント。
 * マウスホバー時に背景色が変わります。
 */
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
