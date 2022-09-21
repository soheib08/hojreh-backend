import { User } from 'src/modules/user/users/schemas/users.schema';

export interface PaginatedUsersInterface {
  readonly paginatedResult: User[] | [],
  readonly totalCount: number,
}
