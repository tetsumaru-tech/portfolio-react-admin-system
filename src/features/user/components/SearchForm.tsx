import type { UserSearchCondition } from '@/features/user/types';

export type SearchFormProps = {
  condition: UserSearchCondition;
  onChange: (condition: UserSearchCondition) => void;
  onSearch: () => void;
};

export function SearchForm({ condition, onChange, onSearch }: SearchFormProps) {
  function handleChange(key: keyof UserSearchCondition, value: string): void {
    const newCondition = { ...condition, [key]: value };
    onChange(newCondition);
  }
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>氏名</th>
            <td>
              <input
                type="text"
                name="name"
                value={condition.name ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(
                    e.target.name as keyof UserSearchCondition,
                    e.target.value,
                  )
                }
              />
            </td>
            <th>メール</th>
            <td>
              <input
                type="text"
                name="email"
                value={condition.email ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(
                    e.target.name as keyof UserSearchCondition,
                    e.target.value,
                  )
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="search-container">
        <button className="search" onClick={() => onSearch()}>
          検索
        </button>
      </div>
    </>
  );
}
