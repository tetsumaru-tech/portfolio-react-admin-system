import { Alert, Snackbar } from '@mui/material';
import { createContext, useContext, useState } from 'react';

/** トースト表示の種類 */
type ToastType = 'success' | 'error' | 'info' | 'warning';

/** トーストのデータ構造 */
type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

/** ToastContext が提供する関数 */
type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

/**
 * ToastContext を使用するためのカスタムフック
 * @returns ToastContextType
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

/**
 * トースト通知を管理するプロバイダーコンポーネント
 * @param children - 子コンポーネント
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /** 新しいトーストを追加する */
  const showToast = (message: string, type: ToastType = 'success') => {
    setToasts((prev) => [...prev, { id: crypto.randomUUID(), message, type }]);
  };

  /** 指定したトーストを閉じる */
  const handleClose = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open
          autoHideDuration={5000}
          onClose={() => handleClose(toast.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            mt: `${index * 50}px`,
          }}
        >
          <Alert
            onClose={() => handleClose(toast.id)}
            severity={toast.type}
            sx={{ width: '100%' }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
}
