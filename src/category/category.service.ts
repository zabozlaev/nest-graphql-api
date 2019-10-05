import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as generateSlug from 'slug';

import { CategoryEntity } from './category.entity';
import { CreateCategoryArgs } from './dtos/createCategory.dto';
import { PaginationArgs } from '../shared/dtos/paginationArgs';
import { PaginatedCategories } from './dtos/paginated.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  async create({ name }: CreateCategoryArgs) {
    const slug = generateSlug(name, {
      lower: true,
    });
    const category = this.categoryRepo.create({
      name,
      slug,
    });
    return this.categoryRepo.save(category);
  }

  async list({ page, perPage }: PaginationArgs): Promise<PaginatedCategories> {
    const [items, total] = await Promise.all([
      this.categoryRepo.find({
        skip: page * perPage,
        take: perPage,
      }),
      this.categoryRepo.count(),
    ]);
    return {
      items,
      total,
    };
  }

  async delete(id) {
    const category = await this.categoryRepo.findOne(id);

    if (!category) {
      throw new HttpException('Category was not found', 400);
    }
    await this.categoryRepo.remove(category);

    return category;
  }

  listByIds(ids: number[]) {
    return this.categoryRepo.findByIds(ids);
  }
}
