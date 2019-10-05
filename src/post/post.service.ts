import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as generateSlug from 'slug';

import { PostEntity } from './post.entity';
import { CreatePostInput } from './dtos/createPost.dto';
import { CategoryService } from '../category/category.service';
import { PostPaginationArgs } from './dtos/paginationArgs';
import { PaginatedPosts } from './dtos/paginated';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async create({ title, content, categories: categoriesIds }: CreatePostInput) {
    const slug = generateSlug(title, {
      lower: true,
    });

    const categories = await this.categoryService.listByIds(categoriesIds);

    const post = this.postRepo.create({
      title,
      slug,
      content,
      categories,
    });
    return this.postRepo.save(post);
  }

  async list({
    page,
    perPage,
    categories,
    createdSort,
  }: PostPaginationArgs): Promise<PaginatedPosts> {
    const [items, total] = await this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'categories')
      .where('categories.id IN (:...ids)', { ids: categories })
      .addOrderBy('post.created', createdSort)
      .skip(perPage * page)
      .take(perPage)
      .getManyAndCount();

    return { items, total };
  }

  async postBySlug(slug: string) {
    const post = await this.postRepo
      .createQueryBuilder('post')
      .where('post.slug = :slug', { slug })
      .leftJoinAndSelect('post.categories', 'category')
      .getOne();

    return post;
  }

  async delete(id: number) {
    const post = await this.postRepo.findOne(id);

    if (!post) {
      throw new HttpException('Post was not found', 404);
    }

    await this.postRepo.remove(post);

    return post;
  }
}
