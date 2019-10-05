import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../user/enums/userRoles.enum';

export const Role = (role: UserRoles) => SetMetadata('role', role);
