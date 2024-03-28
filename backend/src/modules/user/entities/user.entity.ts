import { OneTimeToken } from 'src/modules/ott/entities/ott.entity';
import { UserRole } from 'src/modules/role/entities/user-role.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  imageName?: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  githubId?: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  roles: UserRole[];

  @OneToMany(() => OneTimeToken, (ott) => ott.user)
  ottMappings: OneTimeToken[];
}
