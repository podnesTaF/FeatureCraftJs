import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateUserDto,
  RegisterWithGoogleDto,
} from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './services/auth.service';
import { GoogleAuthService } from './services/google-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: Partial<User> }) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Post('google')
  async googleAuth(@Body() body: { token: string }) {
    const { token } = body;
    const validatedUser =
      await this.googleAuthService.validateGoogleUser(token);
    return validatedUser;
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('google-register')
  registerWithGoogle(@Body() dto: RegisterWithGoogleDto) {
    return this.googleAuthService.register(dto);
  }
}
