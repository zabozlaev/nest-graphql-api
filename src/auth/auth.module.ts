import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './auth.middleware';
import { AuthResolver } from './auth.resolver';
import { AuthRequiredGuard } from './guards/auth.guard';
import { UserModule } from '../user/user.module';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [UserModule],
  providers: [
    AuthService,
    AuthMiddleware,
    AuthResolver,
    AuthRequiredGuard,
    RoleGuard,
  ],
  exports: [AuthMiddleware, AuthRequiredGuard, AuthService],
})
export class AuthModule {}
