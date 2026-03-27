import type { UserSearchCondition } from '@/features/user/types';

export type SearchFormProps = {
  condition: UserSearchCondition;
  onChange: (condition: UserSearchCondition) => void;
};

export function SearchForm({ props }: { props: SearchFormProps }) {
  function handleChange(key: string, value: string) {
    const newCondition = { ...props.condition, [key]: value };
    props.onChange(newCondition);
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
                value={props.condition.name}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </td>
            <th>メール</th>
            <td>
              <input
                type="text"
                name="email"
                value={props.condition.email}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
