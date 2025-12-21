import { Injectable } from '@nestjs/common';
import { Users } from './../users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IGoogleUser } from '../common/interfaces/users.interface';

@Injectable()
export class GoogleUsersProvider {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createGoogleUser(googleUser: IGoogleUser) {
    const user = this.usersRepository.create(googleUser);
    return await this.usersRepository.save(user);
  }

  async getGoogleUserById(googleId: string) {
    return await this.usersRepository.findOneBy({ googleId });
  }
}
