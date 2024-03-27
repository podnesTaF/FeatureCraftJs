import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import {
  CreateUserDto,
  RegisterWithGoogleDto,
} from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
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

  @Get('/google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const user = await this.googleAuthService.oAuthLogin(req.user);
      res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${user.token}`);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
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
