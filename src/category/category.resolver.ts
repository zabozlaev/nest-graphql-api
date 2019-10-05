import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryArgs } from './dtos/createCategory.dto';
import { PaginatedCategories } from './dtos/paginated.dto';
import { PaginationArgs } from '../shared/dtos/paginationArgs';
import { WithIdArgs } from '../shared/dtos/withId';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => PaginatedCategories)
  categories(@Args() args: PaginationArgs) {
    return this.categoryService.list(args);
  }

  @Mutation(() => CategoryEntity)
  createCategory(
    @Args()
    input: CreateCategoryArgs,
  ) {
    return this.categoryService.create(input);
  }

  @Mutation(() => CategoryEntity)
  deleteCategory(@Args() { id }: WithIdArgs) {
    return this.categoryService.delete(id);
  }
}
