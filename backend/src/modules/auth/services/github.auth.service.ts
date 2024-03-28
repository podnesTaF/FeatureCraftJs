import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { AbstractAuthService } from './abstract-auth.service';

@Injectable()
export class GithubAuthService extends AbstractAuthService {
  constructor(
    protected jwtService: JwtService,
    private userService: UserService,
  ) {
    super(jwtService);
  }

  async oAuthLogin({ profile }: any) {
    const { id, displayName } = profile;
    const email = profile._json?.email;

    console.log(email);

    if (!id) {
      throw new Error('User not found!!!');
    }

    if (email) {
      const userRecord = await this.userService.findByCond({
        email,
      });

      if (userRecord) {
        return this.login(userRecord);
      }
    }

    const userRecord = await this.userService.findByCond({
      githubId: id,
    });

    if (!userRecord) {
      const user = await this.userService.create({
        githubId: id,
        fullName: displayName,
        emailVerified: !!email,
        email: email,
      });

      return this.login(user);
    }

    return this.login(userRecord);
  }
}
