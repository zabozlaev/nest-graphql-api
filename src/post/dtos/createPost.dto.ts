import { InputType, Field } from 'type-graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [Number])
  categories: number[];
}
