import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import authConfig from 'src/auth/config/auth.config';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthClientProvider implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    @Inject(authConfig.KEY)
    private readonly authEnv: ConfigType<typeof authConfig>,
  ) {}

  onModuleInit() {
    const clientId = this.authEnv.GOOGLE_CLIENT_ID;
    const clientSecret = this.authEnv.GOOGLE_CLIENT_SECRET;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }
  getOAuthClient() {
    return this.oauthClient;
  }
}
