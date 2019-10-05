import { ArgsType, Field } from 'type-graphql';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

@ArgsType()
export class LoginArgs {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @Field()
  emailOrName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @Field()
  password: string;
}
