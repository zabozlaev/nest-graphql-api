import { CreatePaginatedResponse } from '../../shared/dtos/paginated';
import { PostEntity } from '../post.entity';
import { ObjectType } from 'type-graphql';

@ObjectType()
export class PaginatedPosts extends CreatePaginatedResponse<PostEntity>(
  PostEntity,
) {}
