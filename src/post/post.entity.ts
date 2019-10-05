import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { CategoryEntity } from '../category/category.entity';

@Entity('posts')
@ObjectType('Post')
export class PostEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Index()
  slug: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  content: string;

  @Field()
  @CreateDateColumn()
  created: Date;

  @Field(() => [CategoryEntity], {
    nullable: true,
  })
  @ManyToMany(() => CategoryEntity, category => category.posts)
  @JoinTable()
  categories: CategoryEntity[];
}
