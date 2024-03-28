import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sgMail from '@sendgrid/mail';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';
import { OneTimeTokenService } from '../ott/ott.service';
import { RoleService } from '../role/services/role.service';
import { UserRoleService } from '../role/services/user-role.service';
import { AuthenticatedUser } from './decorators/user.decorator';
import {
  CreaetUserWithGithubDto,
  CreateUserDto,
  CreateUserWithGoogle,
} from './dto/create-user.dto';
import { UpdateUserDtoWithImages } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { getVerificationLetterTemplate } from './utils/getVerificationTemplate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private ottService: OneTimeTokenService,
    private fileService: FileService,
    protected readonly roleService: RoleService,
    protected readonly userRoleService: UserRoleService,
  ) {}

  async create(
    dto: CreateUserDto | CreateUserWithGoogle | CreaetUserWithGithubDto,
  ): Promise<User> {
    await this.isDuplicateEmail(dto.email);
    const user = await this.repository.save(dto);
    const userRole = await this.createRoleForUser(user.id, 'user');
    user.roles = [userRole];

    return this.repository.save(user);
  }

  async isDuplicateEmail(email: string) {
    if (!email) return false;
    const isDuplicate = await this.repository.findOne({
      where: [{ email: email }],
    });
    if (isDuplicate) {
      throw new ForbiddenException('User with this email already exists');
    }
  }

  // create role
  async createRoleForUser(userId: number, roleName: string) {
    const role = await this.roleService.findByName(roleName);
    const userRole = await this.userRoleService.createUserRole({
      roleId: role.id,
      role: role,
      userId,
    });
    return userRole;
  }

  // find by condition
  async findByCond(cond: Partial<User>): Promise<User> {
    const query = this.repository
      .createQueryBuilder('user')
      .where({ ...cond })
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.role', 'role');

    const user = await query.getOne();

    return user || null;
  }

  async sendEmailConfirmation(user: AuthenticatedUser, jwt: string) {
    const fullUser = await this.repository.findOne({
      where: { id: user.id },
    });

    if (fullUser.emailVerified) {
      return;
    }

    const existingToken = await this.ottService.getOttByCond({
      userId: user.id,
      goal: 'email-verify',
    });
    let token: string;

    if (existingToken && existingToken?.expiresAt > new Date()) {
      token = existingToken.ott;

      // If less then 5 minutes passed after the last email sent
      // If so, return void and do not send another email
      if (existingToken.createdAt > new Date(Date.now() - 300000)) {
        return;
      }
    } else {
      token = await this.ottService.createToken(user, jwt, 60, 'email-verify');
    }

    const msg = {
      to: user.email,
      from: {
        email: 'it.podnes@gmail.com',
        name: 'Ace Battle Mile',
      },
      subject: 'Confirm your email address | Ace Battle Mile',
      html: getVerificationLetterTemplate({
        name: fullUser.fullName,
        token: token,
      }),
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log('error sending email', error.message);
    }
  }

  async getVerifyStatus(userId: number): Promise<boolean> {
    const data = await this.repository.findOne({
      where: { id: userId },
      select: ['emailVerified'],
    });

    return data.emailVerified;
  }

  async completeVerification(ott: string) {
    const ottInstance = await this.ottService.getOttInfo(ott);

    if (!ottInstance) {
      throw new ForbiddenException('Invalid token');
    }

    const user = await this.repository.findOne({
      where: { id: ottInstance.userId },
    });

    user.emailVerified = true;

    await this.repository.save(user);

    return user;
  }

  // update user profile
  async updateProfileData(
    id: number,
    dto: UpdateUserDtoWithImages,
  ): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    if (dto.image) {
      await this.fileService.uploadFileToStorage(
        dto.image.originalname,
        `/images/${id}`,
        dto.image.mimetype,
        dto.image.buffer,
        [{ mediaName: dto.image.originalname }],
        user.imageName,
      );

      user.imageName = dto.image.originalname;
    }

    user.fullName = dto.fullName || user.fullName;

    if (dto.email) {
      await this.isDuplicateEmail(dto.email);

      user.email = dto.email;
      user.emailVerified = false;
    }

    return this.repository.save(user);
  }
}
