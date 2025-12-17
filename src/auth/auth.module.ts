import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { TokenProvider } from './providers/token.provider';

@Module({
  providers: [
    AuthService,
    { provide: HashingProvider, useClass: BcryptProvider },
    BcryptProvider,
    TokenProvider,
  ],
  exports: [HashingProvider],
  imports: [forwardRef(() => UsersModule)],
  controllers: [AuthController],
})
export class AuthModule {}
