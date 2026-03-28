import { useState } from 'react';
import { users } from '@/features/user/types';
import { UserList, SearchForm } from '@/features/user/components';
import type {
  SearchFormProps,
  UserListProps,
} from '@/features/user/components';
import type { UserSearchCondition, User } from '@/features/user/types';

export default function UserListPage() {
  const [condition, setCondition] = useState<UserSearchCondition>({});
  const [filterdUsers, setFilterdUsers] = useState<User[]>(users);

  const searchFormProps: SearchFormProps = {
    condition: condition,
    onChange: setCondition,
    onSearch: handlSearch,
  };
  const userListProps: UserListProps = {
    users: filterdUsers,
  };

  function handlSearch(): void {
    setFilterdUsers(
      users.filter((user) => {
        const fullName = user.lastName + user.firstName;
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

  function isMatch(value: string, searchString: string): boolean {
    return (
      !searchString || value.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  return (
    <>
      <h1>User List</h1>
      <h2>検索条件</h2>
      <SearchForm props={searchFormProps} />
      <hr />
      <h2>検索結果</h2>
      <UserList props={userListProps} />
    </>
  );
}
