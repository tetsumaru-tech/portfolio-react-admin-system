import { useState } from 'react';
import { users } from '@/features/user/types';
import { UserList, SearchForm } from '@/features/user/components';
import type { UserSearchCondition, User } from '@/features/user/types';
import { isMatch } from '@/utils';

export default function UserListPage() {
  const [condition, setCondition] = useState<UserSearchCondition>({});
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  function handleSearch(): void {
    setFilteredUsers(
      users.filter((user) => {
        const fullName = (user.lastName + user.firstName).trim();
        if (!isMatch(fullName, condition.name ?? '')) {
          return false;
        }
        if (!isMatch(user.email, condition.email ?? '')) {
          return false;
        }
        return true;
      }),
    );
  }

  return (
    <>
      <h1>User List</h1>
      <h2>検索条件</h2>
      <SearchForm
        condition={condition}
        onChange={setCondition}
        onSearch={handleSearch}
      />
      <hr />
      <h2>検索結果</h2>
      <UserList users={filteredUsers} />
    </>
  );
}
