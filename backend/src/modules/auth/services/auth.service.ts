import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import sgMail from '@sendgrid/mail';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { AbstractAuthService } from './abstract-auth.service';

@Injectable()
export class AuthService extends AbstractAuthService {
  constructor(
    private userService: UserService,
    protected jwtService: JwtService,
  ) {
    super(jwtService);
    sgMail?.setApiKey(process.env.SEND_GRID_API_K);
  }

  async register(dto: CreateUserDto) {
    const encryptedPassword = await bcrypt.hash(dto.password, 12);

    const userData = await this.userService.create({
      ...dto,
      password: encryptedPassword,
    });

    return {
      ...userData,
    };
  }

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Partial<User>> {
    const user = await this.userService.findByCond({
      email,
    });
    if (user) {
      const isEqual = await bcrypt.compare(password, user.password);
      if (isEqual) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}
