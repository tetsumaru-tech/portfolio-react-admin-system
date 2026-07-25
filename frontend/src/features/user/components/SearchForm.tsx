import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from '@mui/material';

import type { UserSearchCondition } from '@/features/user/types';

type SearchFormProps = {
  condition: UserSearchCondition;
  onChange: (condition: UserSearchCondition) => void;
  onSearch: () => void;
  isRealTimeSearch: boolean;
  onToggleRealTimeSearch: (enabled: boolean) => void;
};

/**
 * ユーザー検索フォームコンポーネント
 * @param condition 現在の検索条件
 * @param onChange 検索条件変更時のコールバック
 * @param onSearch 検索実行時のコールバック
 * @param isRealTimeSearch リアルタイム検索の状態
 */
export function SearchForm({
  condition,
  onChange,
  onSearch,
  isRealTimeSearch,
  onToggleRealTimeSearch,
}: SearchFormProps) {
  return (
    <Stack spacing={2}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isRealTimeSearch}
            onChange={(e) => onToggleRealTimeSearch(e.target.checked)}
            color="primary"
          />
        }
        label="リアルタイム検索"
      />
      <TextField
        label="氏名"
        value={condition.name ?? ''}
        onChange={(e) => onChange({ ...condition, name: e.target.value })}
      />
      <TextField
        label="メール"
        value={condition.email ?? ''}
        onChange={(e) => onChange({ ...condition, email: e.target.value })}
      />
      {!isRealTimeSearch && (
        <Button variant="contained" onClick={onSearch}>
          検索
        </Button>
      )}
    </Stack>
  );
}
