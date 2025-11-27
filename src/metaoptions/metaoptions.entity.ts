import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Metaoptions {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
  })
  metaOption: string;
}
