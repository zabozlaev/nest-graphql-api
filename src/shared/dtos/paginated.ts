import { ClassType, Field, ObjectType } from 'type-graphql';
export function CreatePaginatedResponse<T>(resolvedType: ClassType<T>) {
  @ObjectType({
    isAbstract: true,
  })
  abstract class PaginatedResponse {
    @Field(() => [resolvedType], { nullable: true })
    items: T[];

    @Field(() => Number)
    total: number;
  }
  return PaginatedResponse;
}
