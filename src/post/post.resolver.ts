import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveProperty,
  Context,
} from '@nestjs/graphql';
import { PostEntity } from './post.entity';
import { CreatePostInput } from './dtos/createPost.dto';
import { PostService } from './post.service';
import { PaginatedPosts } from './dtos/paginated';
import { PostPaginationArgs } from './dtos/paginationArgs';
import { WithIdArgs } from '../shared/dtos/withId';

@Resolver(() => PostEntity)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => PaginatedPosts, {
    nullable: true,
  })
  posts(@Args() args: PostPaginationArgs) {
    return this.postService.list(args);
  }

  @Query(() => PostEntity, {
    nullable: true,
  })
  post(@Args('slug') slug: string) {
    return this.postService.postBySlug(slug);
  }

  @Mutation(() => PostEntity)
  createPost(@Args('input') input: CreatePostInput) {
    return this.postService.create(input);
  }

  @Mutation(() => PostEntity, {
    nullable: true,
  })
  deletePost(@Args() { id }: WithIdArgs) {
    return this.postService.delete(id);
  }
}
