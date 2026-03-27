import type { User } from '@/features/user/types';
import { users } from '@/features/user/types';
import type { UserSearchCondition } from '@/features/user/types';

export type UserListProps = {
  condition: UserSearchCondition;
};

export function UserList({ props }: { props: UserListProps }) {
  const filterdUsers = users.filter((user: User) => {
    const fullName = user.lastName + user.firstName;
    if (!isMatch(fullName, props.condition.name ?? '')) {
      return false;
    }
    if (!isMatch(user.email, props.condition.email ?? '')) {
      return false;
    }
    return true;
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>氏名</th>
            <th>メール</th>
            <th>誕生日</th>
          </tr>
        </thead>
        <tbody>
          {filterdUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.lastName} {user.firstName}
                </td>
                <td>{user.email}</td>
                <td>{user.birthday}</td>
                <td>
                  <button className="edit">編集</button>
                  <button className="del">削除</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

  function isMatch(value: string, searchString: string): boolean {
    return (
      !searchString || value.toLowerCase().includes(searchString.toLowerCase())
    );
  }
}
