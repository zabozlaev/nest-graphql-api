import { ArgsType, Field } from 'type-graphql';
import { IsEmail, MinLength, MaxLength } from 'class-validator';

@ArgsType()
export class CreateUserArgs {
  @MinLength(2)
  @MaxLength(32)
  @Field()
  name: string;

  @MaxLength(64)
  @IsEmail()
  @Field()
  email: string;

  @MinLength(8)
  @MaxLength(32)
  @Field()
  password: string;
}
