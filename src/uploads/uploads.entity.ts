import { Users } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Uploads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  fileName: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  path: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  mimeType: string;

  @Column({ type: 'float', nullable: false })
  size: number;

  @ManyToOne(() => Users, (user) => user.fileUpload)
  userId: Users;
}
