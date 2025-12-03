import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { PatchUserDTO } from '../dto/patch-user.dto';
import { Users } from './../users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { createManyUsersDTO } from '../dto/create-many-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly dataSource: DataSource,
  ) {}

  createUser(createUserData: CreateUserDTO) {
    const user = this.usersRepository.create(createUserData);
    return this.usersRepository.save(user);
  }

  getUsers(page: number, count: number) {
    return this.usersRepository.find({
      take: count,
      skip: (page - 1) * 10,
      relations: { post: true },
    });
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { post: true },
    });
    if (!user) {
      throw new BadRequestException(`User with id: ${id} is not found`);
    }
    return user;
  }

  async patchUser(patchUserData: PatchUserDTO) {
    const id = patchUserData.id;
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException(`User with id: ${id} is not found`);
    }
    const updatedUser = this.usersRepository.merge(user, patchUserData);
    return this.usersRepository.save(updatedUser);
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with id: ${id} is not found`);
    }
    await this.usersRepository.remove(user);
    return {
      delete: 'success',
      id,
    };
  }

  async createManyUsers(createManyUsersData: createManyUsersDTO) {
    const users: Users[] = [];

    // Create query runner instance.
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect query runner to data source.
    await queryRunner.connect();

    // Start transcation
    await queryRunner.startTransaction();

    try {
      for (const user of createManyUsersData.users) {
        const newUser = queryRunner.manager.create(Users, user);
        const createdUser = await queryRunner.manager.save(newUser);
        users.push(createdUser);
      }
      // If successful the commit
      await queryRunner.commitTransaction();
    } catch (error: any) {
      // If failed then rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException("Couldn't complete the transaction", {
        description: String(error),
      });
    } finally {
      // Release connection
      await queryRunner.release();
    }

    return users;
  }
}
