import { Alert } from '@mui/material';

type Props = {
  message?: string | null;
};

/**
 * 空データ表示コンポーネント
 *
 * @param props - コンポーネントのプロパティ
 * @param [props.message] - 表示するメッセージ。省略時は「データがありません。」を表示。
 * @returns 情報アラート要素
 */
export function Empty({ message }: Props) {
  return <Alert severity="info">{message || 'データがありません。'}</Alert>;
}
