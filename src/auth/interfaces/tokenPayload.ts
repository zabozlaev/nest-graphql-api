import { UserRoles } from '../../user/enums/userRoles.enum';

export interface TokenPayload {
  id: number;
  email: string;
  role: UserRoles;
}
