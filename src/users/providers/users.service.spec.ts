import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../users.entity';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { PaginationService } from 'src/common/pagination/providers/pagination.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { GoogleUsersProvider } from './google-users.provider';
import { CreateUserDTO } from '../dto/create-user.dto';
import { ConflictException } from '@nestjs/common';

//This generates a mock repository type
type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

// Creating a mock repository.
const usersRepositoryMock = (): MockRepository => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

// Sample user data
const user: CreateUserDTO = {
  firstName: 'Chandrahas',
  lastName: 'Balleda',
  email: 'chandrahaswtw@gmail.com',
  password: 'password',
};

// Hashing provider mock
const hashingProviderMock: Partial<HashingProvider> = {
  hashPassword: jest.fn(() => Promise.resolve(user.password)),
};

describe('AppController (e2e)', () => {
  let service: UsersService;
  let usersRepository: MockRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(Users), useValue: usersRepositoryMock() },
        { provide: DataSource, useValue: {} },
        { provide: PaginationService, useValue: {} },
        { provide: HashingProvider, useValue: hashingProviderMock },
        { provide: GoogleUsersProvider, useValue: {} },
      ],
    }).compile();

    service = module.get(UsersService);
    usersRepository = module.get(getRepositoryToken(Users));
  });

  it('Users service to be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should throw exception when user already exists', async () => {
    // Resolved it to return an user, so the creaction fails.
    jest
      .spyOn(service, 'getUserByEmail')
      .mockReturnValueOnce(Promise.resolve(user as Users));
    await expect(service.createUser(user)).rejects.toThrow(ConflictException);
  });

  it('It should create user', async () => {
    // Resolved it to return an null, so the creaction starts to happen.
    jest
      .spyOn(service, 'getUserByEmail')
      .mockReturnValueOnce(Promise.resolve(null));

    //We mocked the return values for save and create.
    usersRepository.create?.mockReturnValueOnce(user);
    usersRepository.save?.mockReturnValueOnce(user);

    const createdUser = await service.createUser(user);
    expect(hashingProviderMock.hashPassword).toHaveBeenCalledWith(
      user.password,
    );
    expect(usersRepository.create).toHaveBeenCalledWith(user);
    expect(usersRepository.save).toHaveBeenCalled();
    expect(createdUser).toEqual(user);
  });
});
