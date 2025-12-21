import { Posts } from 'src/posts/posts.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  googleId: string;

  @OneToMany(() => Posts, (post) => post.author)
  post: Posts[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
