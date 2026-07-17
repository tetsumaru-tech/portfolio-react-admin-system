import dayjs from 'dayjs';

import type { Row as ProfileRow } from '@/features/profile/types';
import type { Row } from '@/features/user/types';

/**
 * フィールド値をフォーマットする関数。
 * @param row - 行の情報。
 * @param value - フォーマットする値。
 * @returns フォーマットされた文字列。
 */
export function formatFieldValue(
  row: Row | ProfileRow,
  value: unknown,
): string {
  if (value == null) return '';

  // select
  if (row.type === 'select') {
    return row.options?.find((o) => o.value === value)?.label ?? '';
  }

  // date
  if (row.type === 'date') {
    return dayjs(String(value)).format('YYYY-MM-DD');
  }

  return String(value);
}
