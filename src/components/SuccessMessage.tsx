import { Alert } from '@mui/material';

export function SuccessMessage({ message }: { message: string | null }) {
  return (
    <>
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}{' '}
    </>
  );
}
