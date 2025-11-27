import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PatchUserDTO } from './dto/patch-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  createUser(@Body() createUserData: CreateUserDTO) {
    return this.usersService.createUser(createUserData);
  }

  @Get()
  getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('count', new DefaultValuePipe(10), ParseIntPipe) count: number,
  ) {
    return this.usersService.getUsers(page, count);
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Patch()
  patchUser(@Body() patchUserData: PatchUserDTO) {
    return this.usersService.patchUser(patchUserData);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
