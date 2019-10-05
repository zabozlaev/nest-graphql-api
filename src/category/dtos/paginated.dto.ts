import { ObjectType } from 'type-graphql';
import { CreatePaginatedResponse } from '../../shared/dtos/paginated';
import { CategoryEntity } from '../category.entity';

@ObjectType()
export class PaginatedCategories extends CreatePaginatedResponse<
  CategoryEntity
>(CategoryEntity) {}
