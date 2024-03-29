import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiresAdmin = this.reflector.get<boolean>(
        'isAdmin',
        context.getHandler(),
      );

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException({
          message: 'The user is not authorized',
        });
      }

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'The user is not authorized',
        });
      }
      const user = this.jwtService.verify(token);
      req.user = user;

      if (requiresAdmin && !user.isAdmin) {
        throw new ForbiddenException('Insufficient permissions');
      }

      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({
        message: 'The user is not authorized',
      });
    }
  }
}
