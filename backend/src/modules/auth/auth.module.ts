import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './services/auth.service';
import { GithubAuthService } from './services/github.auth.service';
import { GoogleAuthService } from './services/google-auth.service';
import { GithubStrategy } from './strategies/github.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          httpOnly: true,
          signOptions: { expiresIn: '120h' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleAuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    GithubStrategy,
    GoogleStrategy,
    GithubAuthService,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
