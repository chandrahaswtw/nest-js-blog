import { Exclude } from 'class-transformer';
import { Posts } from 'src/posts/posts.entity';
import { Uploads } from 'src/uploads/uploads.entity';
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

  @Exclude()
  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  password: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  googleId: string;

  @OneToMany(() => Posts, (post) => post.author)
  post: Posts[];

  @OneToMany(() => Uploads, (fileUpload) => fileUpload.userId)
  fileUpload: Uploads[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
