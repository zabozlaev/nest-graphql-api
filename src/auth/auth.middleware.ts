import {
  NestMiddleware,
  Logger,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { Req } from '../shared/req';
import { Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger('AuthMiddleware');
  constructor(private readonly authService: AuthService) {}

  async use(req: Req, res: Response, next: NextFunction) {
    const token = req.cookies['x-token'];

    if (token) {
      try {
        const userFromToken = await this.authService.getUserFromToken(token);

        if (userFromToken.banned) {
          throw new HttpException('You are banned.', 403);
        }

        req.user = userFromToken;
      } catch (error) {
        this.logger.log('Token Decoding Error', error);
        res.cookie('x-token', '', {
          expires: new Date(),
          httpOnly: true,
        });
      }
    }

    return next();
  }
}
