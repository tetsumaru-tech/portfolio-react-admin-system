import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

/**
 * 確認ダイアログコンポーネント
 *
 * 確認・キャンセルの2つのアクションを持つモーダルダイアログを表示します。
 * メッセージやタイトル、ボタンラベルはプロパティでカスタマイズ可能です。
 *
 * @param props コンポーネントのプロパティ
 * @param props.open ダイアログを開くかどうか
 * @param props.title ダイアログのタイトル
 * @param props.message ダイアログに表示するメッセージ
 * @param [props.confirmLabel='OK'] 確認ボタンのラベル（省略時は 'OK'）
 * @param [props.cancelLabel='キャンセル'] キャンセルボタンのラベル（省略時は 'キャンセル'）
 * @param props.onConfirm 確認ボタンが押されたときのコールバック
 * @param props.onClose ダイアログを閉じるときのコールバック
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'OK',
  cancelLabel = 'キャンセル',
  onConfirm,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontWeight: 'bold',
        }}
      >
        <DeleteForeverIcon color="error" />
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText sx={{ whiteSpace: 'pre-line' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={onClose} sx={{ minWidth: 100 }}>
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ minWidth: 100 }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
