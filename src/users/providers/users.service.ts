import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { PatchUserDTO } from '../dto/patch-user.dto';
import { Users } from './../users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
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
}
