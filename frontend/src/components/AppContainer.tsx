import type { SxProps, Theme } from '@mui/material';
import { Container } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

/**
 * アプリケーションのコンテナコンポーネント
 * MUIのContainerコンポーネントをラップし、アプリ全体のレイアウトを提供します。
 * @param children コンテナ内に表示する子要素
 * @param sx 追加のスタイルを指定するためのSxProps
 * @returns アプリケーションのコンテナコンポーネント
 */
export function AppContainer({ children, sx }: Props) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ...sx }}>
      {children}
    </Container>
  );
}
