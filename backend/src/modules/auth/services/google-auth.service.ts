import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { RegisterWithGoogleDto } from 'src/modules/user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { AbstractAuthService } from './abstract-auth.service';

@Injectable()
export class GoogleAuthService extends AbstractAuthService {
  constructor(
    protected jwtService: JwtService,
    private userService: UserService,
  ) {
    super(jwtService);
  }

  async register(dto: RegisterWithGoogleDto) {
    const userProfile = await this.validateGoogleToken(dto.id_token);

    await this.userService.create({
      email: userProfile.email,
      fullName: userProfile.given_name,
      emailVerified: true,
    });
  }

  async validateGoogleUser(token: string): Promise<any> {
    const userProfile = await this.validateGoogleToken(token);

    const userRecord = await this.userService.findByCond({
      email: userProfile.email,
    });

    if (userRecord) {
      return this.login(userRecord);
    }

    return null;
  }

  async validateGoogleToken(token: string): Promise<TokenPayload> {
    const client = new OAuth2Client();
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      return payload;
    } catch (error) {
      throw new Error('Invalid Google token');
    }
  }
}
