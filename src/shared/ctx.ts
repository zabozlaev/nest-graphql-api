import { Response } from 'express';
import { Req } from './req';
import { UserEntity } from '../user/user.entity';
import { TokenPayload } from '../auth/interfaces/tokenPayload';

export interface GraphqlContext {
  req?: Req;
  res: Response;
  user?: UserEntity | TokenPayload;
}
