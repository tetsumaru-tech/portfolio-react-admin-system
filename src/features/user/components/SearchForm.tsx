import { TextField, Button, Stack } from '@mui/material';

import type { UserSearchCondition } from '@/features/user/types';

type SearchFormProps = {
  condition: UserSearchCondition;
  onChange: (condition: UserSearchCondition) => void;
  onSearch: () => void;
};

export function SearchForm({ condition, onChange, onSearch }: SearchFormProps) {
  return (
    <Stack spacing={2}>
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
      <Button variant="contained" onClick={onSearch}>
        検索
      </Button>
    </Stack>
  );
}
