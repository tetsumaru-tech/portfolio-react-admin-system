import { useState } from 'react';
import { UserList, SearchForm } from '@/features/user/components';
import type {
  SearchFormProps,
  UserListProps,
} from '@/features/user/components';
import type { UserSearchCondition } from '@/features/user/types';

export default function UserListPage() {
  const [condition, setCondition] = useState<UserSearchCondition>({});
  const searchFormProps: SearchFormProps = {
    condition: condition,
    onChange: setCondition,
  };
  const userListProps: UserListProps = {
    condition: condition,
  };
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
