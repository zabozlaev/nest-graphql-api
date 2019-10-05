import { Resolver, Context, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { GraphqlContext } from '../shared/ctx';
import { AuthRequiredGuard } from './guards/auth.guard';
import { LoginArgs } from './dtos/login';
import { AuthService } from './auth.service';
import { CreateUserArgs } from '../user/dtos/createUser.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserEntity)
  @UseGuards(AuthRequiredGuard)
  me(@Context() ctx: GraphqlContext) {
    return ctx.user;
  }

  @Mutation(() => Boolean)
  async login(@Context() ctx: GraphqlContext, @Args() args: LoginArgs) {
    const token = await this.authService.login(args);
    ctx.res.cookie('x-token', token, {
      httpOnly: true,
      maxAge: 2 * 3600 * 60,
    });
    return true;
  }

  @Mutation(() => UserEntity)
  async register(@Args() args: CreateUserArgs) {
    return this.authService.register(args);
  }
}
