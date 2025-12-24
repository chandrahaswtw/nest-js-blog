import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { TokenProvider } from './providers/token.provider';
import { GoogleProvider } from './social/providers/google.provider';
import { GoogleController } from './social/google.controller';
import { GoogleAuthClientProvider } from './social/providers/google-auth-client.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [
    AuthService,
    { provide: HashingProvider, useClass: BcryptProvider },
    BcryptProvider,
    TokenProvider,
    GoogleProvider,
    GoogleAuthClientProvider,
  ],
  exports: [HashingProvider],
  imports: [forwardRef(() => UsersModule)],
  controllers: [AuthController, GoogleController],
})
export class AuthModule {}
