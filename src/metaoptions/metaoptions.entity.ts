import { Posts } from 'src/posts/posts.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class Metaoptions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  metaOption: string;

  @OneToOne(() => Posts, (post) => post.metaOption)
  post: Posts;
}
