import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  Index,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { UserRoles } from './enums/userRoles.enum';
import { CommentEntity } from '../comment/comment.entity';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  @Index()
  email: string;

  @Column()
  password: string;

  @Column('text', {
    default: UserRoles.USER,
  })
  role: UserRoles;

  @Field(() => Boolean)
  @Column('boolean', {
    default: false,
  })
  banned: boolean;

  @Field()
  @CreateDateColumn()
  created: Date;

  @OneToMany(() => CommentEntity, comment => comment.user)
  comments: CommentEntity[];
}
