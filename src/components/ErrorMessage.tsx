import { Alert } from '@mui/material';

/**
 * エラーメッセージを表示するコンポーネント
 * @param message 表示するエラーメッセージ。nullの場合は表示しない。
 * @return エラーメッセージを表示するコンポーネント
 */
export function ErrorMessage({ message }: { message: string | null }) {
  return (
    <>
      {message && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}{' '}
    </>
  );
}
