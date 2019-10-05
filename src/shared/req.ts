import { Request } from 'express';
import { UserEntity } from '../user/user.entity';
import { TokenPayload } from '../auth/interfaces/tokenPayload';

export interface Req extends Request {
  user?: UserEntity | TokenPayload;
}
