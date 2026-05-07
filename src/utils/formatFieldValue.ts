import dayjs from 'dayjs';

import type { Row } from '@/features/user/types';

export function formatFieldValue(row: Row, value: unknown): string {
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
