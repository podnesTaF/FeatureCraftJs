import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { Role } from '../entities/role.entity';

export class CreateUserRoleDto {
  @IsNumber()
  roleId: number;

  @IsObject()
  @IsOptional()
  role?: Role;

  @IsNumber()
  userId: number;
}
