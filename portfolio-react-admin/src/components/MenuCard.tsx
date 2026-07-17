import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Box,
} from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  description: string;
  icon?: ReactNode;
  onClick: () => void;
};

/**
 * メニューカードコンポーネント
 */
export function MenuCard({ title, description, icon, onClick }: Props) {
  return (
    <Card elevation={5}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 48,
                }}
              >
                {icon && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'primary.main',
                    }}
                  >
                    {icon}
                  </Box>
                )}
              </Box>

              <Box>
                <Typography variant="h6">{title}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
