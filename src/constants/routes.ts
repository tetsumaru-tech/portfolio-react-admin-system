export const ROUTEPATTERNS = {
  TOP: '/',
  USERS: '/users',
  USER_CREATE: '/users/create',
  USER_DETAIL: '/users/:id',
  USER_EDIT: '/users/:id/edit',
  USER_CONFIRM: '/users/:id/confirm',
  USER_PASSWORD_EDIT: '/users/:id/password',
  PROFILE: '/profile',
  LOGIN: '/login',
} as const;

export const ROUTES = {
  top: () => '/',
  users: () => '/users',
  userCreate: () => '/users/create',
  userDetail: (id: number | string) => `/users/${id}`,
  userEdit: (id: number | string) => `/users/${id}/edit`,
  userConfirm: (id: number | string) => `/users/${id}/confirm`,
  userPassowrdEdit: (id: number | string) => `/users/${id}/password`,
  profile: () => '/profile',
  login: () => '/login',
} as const;
