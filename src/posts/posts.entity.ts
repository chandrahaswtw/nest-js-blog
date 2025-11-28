import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Metaoptions } from './../metaoptions/metaoptions.entity';
import { EPostStatus } from './enum/post-status.enum';
import { EPostType } from './enum/post-type.enum';
import { Users } from 'src/users/users.entity';
import { Tags } from 'src/tags/tags.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 15,
  })
  postType: EPostType;

  @Column({
    type: 'varchar',
    length: 256,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 15,
  })
  status: EPostStatus;

  @Column({
    type: 'varchar',
    length: 1024,
  })
  content: string;

  @OneToOne(() => Metaoptions, (metaOption) => metaOption.post, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  metaOption: Metaoptions;

  @ManyToOne(() => Users, (author) => author.post, { onDelete: 'CASCADE' })
  author: Users;

  @ManyToMany(() => Tags, (tag) => tag.posts)
  @JoinTable()
  tags: Tags[];
}
