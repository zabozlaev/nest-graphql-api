import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class WithIdArgs {
  @Field(() => Number)
  id: number;
}
