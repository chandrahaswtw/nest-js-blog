import {
  Injectable,
  Inject,
  UnauthorizedException,
  forwardRef,
  OnModuleInit,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { GoogleTokenDTO } from '../dto/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TokenProvider } from 'src/auth/providers/token.provider';
import { GoogleAuthClientProvider } from './google-auth-client.provider';

@Injectable()
export class GoogleProvider implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly tokenProvider: TokenProvider,
    private readonly googleAuthClientProvider: GoogleAuthClientProvider,
  ) {}

  onModuleInit() {
    console.log('SMOKING GUN');
  }

  async authenticate(googleTokenDTO: GoogleTokenDTO) {
    try {
      // Verify the Google Token Sent By User
      const oauthClient = this.googleAuthClientProvider.getOAuthClient();
      const token = await oauthClient.verifyIdToken({
        idToken: googleTokenDTO.token,
      });

      const payload = token.getPayload();

      if (!payload) {
        throw new UnauthorizedException('Invalid user');
      }

      //Get data from token payload
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = payload;

      //Check if user is present
      let currentUser = await this.usersService.getUserByEmail(email!);

      //If user not present create an user
      if (!currentUser) {
        currentUser = await this.usersService.createGoogleUser({
          email: email!,
          firstName: firstName ?? '',
          lastName: lastName ?? '',
          googleId,
        });
      }

      //In either cases (user present or not, generate tokens and send).
      return await this.tokenProvider.generateTokens({
        id: currentUser?.id,
        email: currentUser.email,
        username: currentUser.firstName,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
