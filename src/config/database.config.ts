import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.SYNCHRONIZE === 'true' ? true : false,
  autoLoadEntities: process.env.AUTO_LOAD_ENTITIES === 'true' ? true : false,
}));
