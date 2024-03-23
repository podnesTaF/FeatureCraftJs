import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedUser, GetUser } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/exists/:email')
  async isUserExists(email: string) {
    return await this.userService.isDuplicateEmail(email);
  }

  @Post('/email-confirmation')
  @UseGuards(JwtAuthGuard)
  sendEmailConfirmation(
    @Body() body: { token: string },
    @GetUser() user: AuthenticatedUser,
  ) {
    return this.userService.sendEmailConfirmation(user, body.token);
  }

  @Get('/verify-status')
  @UseGuards(JwtAuthGuard)
  getVerifyStatus(@GetUser() user: AuthenticatedUser) {
    return this.userService.getVerifyStatus(user.id);
  }

  @Post('/verify')
  verifyMember(@Body() body: { ott: string }): Promise<User> {
    return this.userService.completeVerification(body.ott);
  }

  @Patch('/profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], {
      limits: {
        fileSize: 2 * 1024 * 1024, // Set to the larger limit (2MB for images)
      },
    }),
  )
  updateProfileData(
    @UploadedFiles()
    files: { image?: Express.Multer.File[] },
    @Request() req,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateProfileData(req.user.id, {
      ...body,
      image: files?.image?.[0],
    });
  }
}
