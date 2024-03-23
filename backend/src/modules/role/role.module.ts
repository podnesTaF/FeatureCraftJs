import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './controllers/role.controller';
import { UserRoleController } from './controllers/user-role.controller';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { RoleService } from './services/role.service';
import { UserRoleService } from './services/user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, UserRole])],
  controllers: [RoleController, UserRoleController],
  providers: [RoleService, UserRoleService],
  exports: [RoleService, UserRoleService],
})
export class RoleModule {}
