import { useState } from 'react';
import { users } from '@/features/user/types';
import { UserList, SearchForm } from '@/features/user/components';
import type { UserSearchCondition, User } from '@/features/user/types';
import { isMatch } from '@/utils';
import { Pagination, Box } from '@mui/material';

export default function UserListPage() {
  const [condition, setCondition] = useState<UserSearchCondition>({});
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [page, setPage] = useState<number>(1);
  const perPage = 4; // 1ページ毎の件数
  const startIndex = (page - 1) * perPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + perPage);
  const lastPage = Math.ceil(filteredUsers.length / perPage);

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
    setPage(1);
  }

  function handlePaging(page: number): void {
    setPage(page);
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
      <UserList users={paginatedUsers} />
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={lastPage}
          page={page}
          onChange={(_, value) => handlePaging(value)}
        />
      </Box>
    </>
  );
}
