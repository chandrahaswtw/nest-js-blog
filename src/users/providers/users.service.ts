import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { PatchUserDTO } from '../dto/patch-user.dto';

@Injectable()
export class UsersService {
  createUser(createUserData: CreateUserDTO) {
    return createUserData;
  }

  getUsers(page: number, count: number) {
    return [];
  }

  getUserById(id: number) {
    return;
  }

  patchUser(patchUserData: PatchUserDTO) {
    return;
  }

  deleteUser(id: number) {
    return;
  }
}
