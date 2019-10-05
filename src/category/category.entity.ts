import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
} from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType('Category')
@Entity('categories')
export class CategoryEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  @Index()
  slug: string;

  @ManyToMany(() => PostEntity)
  posts: PostEntity[];
}
