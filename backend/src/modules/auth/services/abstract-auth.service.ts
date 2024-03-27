import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/modules/role/entities/user-role.entity';
import { RequestRole } from 'src/modules/user/decorators/user.decorator';
import { User } from 'src/modules/user/entities/user.entity';

export abstract class AbstractAuthService {
  constructor(protected readonly jwtService: JwtService) {}

  async login(user: Partial<User>) {
    const roles = this.getRoles(user.roles);
    const payload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      imageName: user.imageName,
      roles,
    };
    const jwtToken = this.generateJwtToken(payload);

    return {
      ...payload,
      token: jwtToken,
    };
  }

  generateJwtToken(data: {
    id: number;
    email: string;
    roles: RequestRole[];
    imageName: string;
    fullName: string;
  }) {
    return this.jwtService.sign(data);
  }
  getRoles(roles: UserRole[]) {
    return roles?.map((userRole) => ({
      id: userRole.role.id,
      name: userRole.role.name,
      active: userRole.active,
    }));
  }
}
