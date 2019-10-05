import { Injectable } from '@nestjs/common';

import { verify, sign } from 'jsonwebtoken';
import { UserEntity } from '../user/user.entity';
import { TokenPayload } from './interfaces/tokenPayload';
import { LoginArgs } from './dtos/login';
import { UserService } from '../user/user.service';
import { CreateUserArgs } from '../user/dtos/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(args: LoginArgs) {
    const user = await this.userService.findByCreds(args);
    return this.signToken(user);
  }

  async register(args: CreateUserArgs) {
    return this.userService.createUser(args);
  }

  me(id: number) {
    return this.userService.findById(id);
  }

  async getUserFromToken(token: string) {
    const tokenPayload: TokenPayload = (await verify(
      token,
      process.env.JWT_SECRET,
    )) as TokenPayload;

    return this.userService.findById(tokenPayload.id);
  }

  signToken({ id, email, role }: UserEntity) {
    const payload: TokenPayload = { id, email, role };
    return new Promise((resolve, reject) => {
      sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '2h' },
        (err, encoded) => {
          if (err) {
            reject(err);
          }
          resolve(encoded);
        },
      );
    });
  }
}
