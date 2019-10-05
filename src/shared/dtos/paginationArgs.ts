import { ArgsType, Field } from 'type-graphql';
import { Min, Max } from 'class-validator';
import { SortDirection } from '../enums/sort';

@ArgsType()
export class PaginationArgs {
  @Min(0)
  @Field(() => Number)
  page: number;

  @Min(5)
  @Max(20)
  @Field(() => Number, {
    defaultValue: 10,
  })
  perPage: number;

  @Field(() => SortDirection, { nullable: true })
  createdSort: SortDirection = SortDirection.DESC;
}
