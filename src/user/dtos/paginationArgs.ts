import { PaginationArgs } from '../../shared/dtos/paginationArgs';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class UserPaginationArgs extends PaginationArgs {
  @Field(() => Boolean, { nullable: true })
  banned?: boolean;
}
