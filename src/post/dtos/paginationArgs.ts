import { PaginationArgs } from '../../shared/dtos/paginationArgs';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class PostPaginationArgs extends PaginationArgs {
  @Field(() => [Number])
  categories: number[];
}
