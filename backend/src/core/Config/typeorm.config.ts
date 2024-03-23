import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as evnconfig } from 'dotenv';
import { OneTimeToken } from 'src/modules/ott/entities/ott.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { UserRole } from 'src/modules/role/entities/user-role.entity';
import { User } from 'src/modules/user/entities/user.entity';

evnconfig();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQLHOST,
  port: parseInt(process.env.MYSQLPORT, 10),
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  entities: [User, OneTimeToken, UserRole, Role],
  synchronize: true,
};
