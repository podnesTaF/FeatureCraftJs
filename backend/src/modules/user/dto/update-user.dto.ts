import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {}

export class UpdateUserDtoWithImages extends UpdateUserDto {
  image?: Express.Multer.File;
  imageName?: string;
}
