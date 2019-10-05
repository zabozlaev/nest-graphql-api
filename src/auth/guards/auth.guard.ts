import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphqlContext } from '../../shared/ctx';

@Injectable()
export class AuthRequiredGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return !!(ctx.getContext() as GraphqlContext).user;
  }
}
