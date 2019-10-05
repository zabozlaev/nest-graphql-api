import { CreatePaginatedResponse } from '../../shared/dtos/paginated';
import { UserEntity } from '../user.entity';
import { ObjectType } from 'type-graphql';

@ObjectType()
export class PaginatedUsers extends CreatePaginatedResponse<UserEntity>(
  UserEntity,
) {}
