import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphqlContext } from '../../shared/ctx';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../user/enums/userRoles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    const role = this.reflector.get<UserRoles>('role', context.getHandler());

    return (ctx.getContext() as GraphqlContext).user.role === role;
  }
}
