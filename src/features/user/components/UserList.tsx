import type { User } from '@/features/user/types';

export type UserListProps = {
  users: User[];
};

export function UserList({ props }: { props: UserListProps }) {
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
          {props.users.map((user) => {
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
}
