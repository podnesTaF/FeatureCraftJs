import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './core/Config';
import { HttpRequestLogger } from './core/Loggers';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { MediaModule } from './modules/media/media.module';
import { OttModule } from './modules/ott/ott.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    OttModule,
    FileModule,
    MediaModule,
    RoleModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      consumer.apply(HttpRequestLogger).forRoutes('*');
    }
  }
}
