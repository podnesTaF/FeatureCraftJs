import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { OneTimeToken } from '../ott/entities/ott.entity';
import { OneTimeTokenService } from '../ott/ott.service';
import { Role } from '../role/entities/role.entity';
import { UserRole } from '../role/entities/user-role.entity';
import { RoleService } from '../role/services/role.service';
import { UserRoleService } from '../role/services/user-role.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, OneTimeToken, UserRole, Role])],
  controllers: [UserController],
  providers: [
    UserService,
    OneTimeTokenService,
    FileService,
    RoleService,
    UserRoleService,
  ],
  exports: [UserService],
})
export class UserModule {}
