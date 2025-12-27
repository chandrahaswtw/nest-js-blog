import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from './../../src/app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { appCreate } from '../../src/main';
import request from 'supertest';
import { CreateUserDTO } from '../../src/users/dto/create-user.dto';

import { faker } from '@faker-js/faker';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let configService: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appCreate(app);
    await app.init();

    configService = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    //We can add this into a new function. For ease we are including it in same file:
    const testDataSource = await new DataSource({
      type: 'postgres',
      host: configService.get('db.host'),
      port: +configService.get('db.port'),
      username: configService.get('db.username'),
      password: configService.get('db.password'),
      database: configService.get('db.database'),
      synchronize: configService.get('db.synchronize'),
    });
    await testDataSource.initialize();

    // Doesn't delete the DB but clears all it's cobntents
    await testDataSource.dropDatabase();
    await testDataSource.destroy();
    await app.close();
  });

  it('/users rejects if imcomplete request is provided', () => {
    return request(httpServer)
      .post('/users')
      .send({})
      .expect(400)
      .then(({ body }) => {
        console.log(body);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  it('/users is saved successfully', () => {
    const completeUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: 'Password123#',
    };

    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.firstName).toBe(completeUser.firstName);
        expect(body.data.lastName).toBe(completeUser.lastName);
        expect(body.data.email).toBe(completeUser.email);
      })
      .catch((e) => {
        console.log(e);
      });
  });
});
