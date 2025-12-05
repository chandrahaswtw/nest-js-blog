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
import { createManyUsersDTO } from './dto/create-many-users.dto';
import { ApiParam, ApiQuery, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() createUserData: CreateUserDTO) {
    return this.usersService.createUser(createUserData);
  }

  @Post('/createMany')
  @ApiOperation({ summary: 'Create multiple users' })
  createManyUsers(@Body() createManyUsersData: createManyUsersDTO) {
    return this.usersService.createManyUsers(createManyUsersData);
  }

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: true,
    example: 1,
    description: 'Enter the page number',
  })
  @ApiQuery({
    name: 'count',
    type: 'number',
    required: true,
    example: 5,
    description: 'Enter the page count',
  })
  getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('count', new DefaultValuePipe(10), ParseIntPipe)
    count: number,
  ) {
    return this.usersService.getUsers(page, count);
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
