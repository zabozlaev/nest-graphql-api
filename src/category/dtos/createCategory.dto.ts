import { Field, ArgsType } from 'type-graphql';

@ArgsType()
export class CreateCategoryArgs {
  @Field()
  name: string;
}
