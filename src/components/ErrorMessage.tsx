import { Alert } from '@mui/material';

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
