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
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PatchUserDTO } from './dto/patch-user.dto';
import { UsersService } from './providers/users.service';
import { createManyUsersDTO } from './dto/create-many-users.dto';
import { ApiParam, ApiOperation } from '@nestjs/swagger';
import { PaginateQueryDTO } from 'src/common/pagination/dto/paginate-query.dto';
import { Authentication } from 'src/auth/decorators/authentication.decorator';
import { EAuthType } from 'src/auth/common/enums/auth.enums';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Authentication(EAuthType.None)
  @Post()
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() createUserData: CreateUserDTO) {
    return this.usersService.createUser(createUserData);
  }

  @Authentication(EAuthType.None)
  @Post('/createMany')
  @ApiOperation({ summary: 'Create multiple users' })
  createManyUsers(@Body() createManyUsersData: createManyUsersDTO) {
    return this.usersService.createManyUsers(createManyUsersData);
  }

  @Get()
  @ApiOperation({ summary: 'Get users' })
  getUsers(@Query() getUsersQueryData: PaginateQueryDTO) {
    return this.usersService.getUsers(getUsersQueryData);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: 'Enter the id to fetch',
  })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Patch user' })
  patchUser(@Body() patchUserData: PatchUserDTO) {
    return this.usersService.patchUser(patchUserData);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: 'Enter the id to delete',
  })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
