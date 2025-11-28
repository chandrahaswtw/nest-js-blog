import { Posts } from 'src/posts/posts.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 256,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 512,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  schema: string;

  @Column({
    type: 'varchar',
    length: 1024,
  })
  imageURL: string;

  @ManyToMany(() => Posts, (post) => post.tags)
  posts: Posts[];
}
