import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { CreateUserArgs } from './dtos/createUser.dto';
import { LoginArgs } from '../auth/dtos/login';
import { UserPaginationArgs } from './dtos/paginationArgs';
import { PaginatedUsers } from './dtos/paginated';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser({ name, email, password }: CreateUserArgs) {
    if (
      await this.userRepo.findOne({
        email,
      })
    ) {
      throw new HttpException('This email is already in use', 403);
    }

    const hashed = await hash(password, 10);

    const user = this.userRepo.create({
      name,
      email,
      password: hashed,
    });

    return this.userRepo.save(user);
  }

  async list(args: UserPaginationArgs): Promise<PaginatedUsers> {
    const [items, total] = await this.userRepo.findAndCount({
      where: {
        banned: args.banned,
      },
      order: {
        created: args.createdSort,
      },
      skip: args.page * args.perPage,
      take: args.perPage,
    });
    return {
      items,
      total,
    };
  }

  async findByCreds({ emailOrName, password }: LoginArgs) {
    const user = await this.userRepo.findOne({
      where: [{ email: emailOrName }, { name: emailOrName }],
    });

    if (!user || !(await compare(password, user.password))) {
      throw new HttpException('Incorrect Email or Password', 403);
    }
    return user;
  }

  async ban(id: number) {
    const user = await this.userRepo.findOne(id);

    if (!user) {
      throw new HttpException('User was not found', 400);
    }

    user.banned = true;
    return this.userRepo.save(user);
  }

  findById(id: number) {
    return this.userRepo.findOne(id);
  }
}
