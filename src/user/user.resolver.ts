import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { WithIdArgs } from '../shared/dtos/withId';
import { Role } from '../auth/decorators/role.dectorator';
import { UserRoles } from './enums/userRoles.enum';
import { AuthRequiredGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { PaginatedUsers } from './dtos/paginated';
import { UserPaginationArgs } from './dtos/paginationArgs';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => PaginatedUsers)
  @Role(UserRoles.ADMIN)
  @UseGuards(AuthRequiredGuard, RoleGuard)
  users(@Args() args: UserPaginationArgs) {
    return this.userService.list(args);
  }

  @Mutation(() => UserEntity)
  @Role(UserRoles.ADMIN)
  @UseGuards(AuthRequiredGuard, RoleGuard)
  ban(@Args() { id }: WithIdArgs) {
    return this.userService.ban(id);
  }
}
